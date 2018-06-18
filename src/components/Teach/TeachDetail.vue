<template>
    <div>
        <h1>我的教改项目</h1>
        <Timeline>
            <TimelineItem>
                <p class="time">项目基本信息</p>
                <div class="content">
                    <p>
                        <b>教改题目：</b>{{teach.title}}</p>
                    <p>
                        <b>简介：</b>{{teach.description}}</p>
                    <p>
                        <b>年度：</b>{{teach.year}}</p>
                    <p>
                        <b>级别：</b>{{teachLevel}}</p>
                    <p>
                        <b>当前进度：</b>
                        <Tag color="green">{{teachStatus}}</Tag>
                    </p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">申请管理</p>
                <div class="content">
                    <p v-if="teach.status==1">申请已提交，等待审核中</p>
                    <p v-if="teach.status>1">申请审核已通过</p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">中期管理</p>
                <div class="content">
                    <p v-if="teach.middle_file!=''">已上传：
                        <DownloadFile :fileId="teach.middle_file"></DownloadFile>
                        <!-- <a href="">{{teach.middle_file}}</a> -->
                    </p>
                    <Form v-if="teach.status==2">
                        <FormItem>
                            <RadioGroup v-model="opMiddle">
                                <Radio label="101">提交中期报告</Radio>
                                <Radio label="103">提交终止申请</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <UploadFile buttonTitle="上传相应材料" v-model="uploadedMiddleFile"></UploadFile>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="submitMiddle">提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">结题管理</p>
                <div class="content">
                    <p v-if="teach.end_file!=''">已上传：
                        <DownloadFile :fileId="teach.end_file"></DownloadFile>
                        <!-- <a href="">{{teach.end_file}}</a> -->
                    </p>
                    <Form v-if="teach.status==4">
                        <FormItem>
                            <RadioGroup v-model="opEnd">
                                <Radio label="102">提交结题材料</Radio>
                                <Radio label="103">提交终止申请</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <UploadFile buttonTitle="上传相应材料" v-model="uploadedEndFile"></UploadFile>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="submitEnd">提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </TimelineItem>
        </Timeline>
    </div>
</template>

<script>
import UploadFile from "../UploadFile.vue";
import DownloadFile from "../DownloadFile.vue";

export default {
    components: {
        UploadFile,
        DownloadFile
    },
    data() {
        return {
            teachId: this.$route.params.id,
            teach: Object,
            opMiddle: "101",
            uploadedMiddleFile: "",
            opEnd: "102",
            uploadedEndFile: ""
        };
    },
    methods: {
        fetchData() {
            this.$axios
                .get("/api/teacher/teach/" + this.teachId)
                .then(response => {
                    if (response.data.status == "OK") {
                        this.teach = response.data.teach;
                    } else this.$Message.error(response.data.msg);
                })
                .catch(error => {});
        },
        submitMiddle() {
            var valid = this.uploadedMiddleFile != "" && this.opMiddle != "";
            if (!valid) this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/teacher/teach/" + this.teachId + "/update", {
                        operation: parseInt(this.opMiddle),
                        middle_file: this.uploadedMiddleFile
                    })
                    .then(response => {
                        if (response.data.status == "OK")
                            this.$Message.success("提交成功");
                        else this.$Message.error("提交失败");
                        this.fetchData();
                    })
                    .catch(error => {
                        this.$Message.error("提交出错");
                    });
            }
        },
        submitEnd() {
            var valid = this.uploadedEndFile != "" && this.opEnd != "";
            if (!valid) this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/teacher/teach/" + this.teachId + "/update", {
                        operation: parseInt(this.opEnd),
                        end_file: this.uploadedEndFile
                    })
                    .then(response => {
                        if (response.data.status == "OK")
                            this.$Message.success("提交成功");
                        else this.$Message.error("提交失败");
                        this.fetchData();
                    })
                    .catch(error => {
                        this.$Message.error("提交出错");
                    });
            }
        }
    },
    computed: {
        teachLevel() {
            if (this.teach.level == 1) return "院级";
            else if (this.teach.level == 2) return "市级";
            else return "国家级";
        },
        teachStatus() {
            var statusName = "";
            switch (this.teach.status) {
                case 1:
                    statusName = "申请审核中";
                    break;
                case 2:
                    statusName = "前期进行中";
                    break;
                case 3:
                    statusName = "中期审核中";
                    break;
                case 4:
                    statusName = "后期进行中";
                    break;
                case 5:
                    statusName = "结题审核中";
                    break;
                case 6:
                    statusName = "已结题";
                    break;
                case 7:
                    statusName = "已终止";
                    break;
                default:
                    break;
            }
            return statusName;
        }
    },
    beforeMount() {
        this.fetchData();
    }
};
</script>

<style>
</style>
