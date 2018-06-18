<template>
    <div>
        <h1>SRTP 项目管理</h1>
        <Timeline>
            <TimelineItem>
                <p class="time">项目基本信息</p>
                <div class="content">
                    <p>
                        <b>SRTP 题目：</b>{{srtp.title}}</p>
                    <p>
                        <b>简介：</b>{{srtp.description}}</p>
                    <p>
                        <b>年度：</b>{{srtp.year}}</p>
                    <p>
                        <b>级别：</b>{{srtpLevel}}</p>
                    <p>
                        <b>负责人：</b>{{srtp.leader_id}}</p>
                    <p>
                        <b>成员：</b>{{srtp.members}}</p>
                    <p>
                        <b>指导教师：</b>{{srtp.teacher_id}}</p>
                    <p>
                        <b>当前进度：</b>
                        <Tag color="green">{{srtpStatus}}</Tag>
                    </p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">申请管理</p>
                <div class="content">
                    <p v-if="srtp.apply_file!=''">已上传：
                        <DownloadFile :fileId="srtp.apply_file"></DownloadFile>
                        <!-- <a href="">{{srtp.apply_file}}</a> -->
                    </p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">中期管理</p>
                <div class="content">
                    <p v-if="srtp.middle_file!=''">已上传：
                        <DownloadFile :fileId="srtp.middle_file"></DownloadFile>
                        <!-- <a href="">{{srtp.middle_file}}</a> -->
                    </p>
                    <Form v-if="srtp.status==2">
                        <FormItem>
                            <RadioGroup v-model="opMiddle">
                                <Radio label="101">提交中期报告</Radio>
                                <Radio label="102">提交终止申请</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <UploadFile buttonTitle="上传相应材料" v-model="middleFile"></UploadFile>
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
                    <p v-if="srtp.end_file!=''">已上传：
                        <DownloadFile :fileId="srtp.end_file"></DownloadFile>
                        <!-- <a href="">{{srtp.end_file}}</a> -->
                    </p>
                    <Form v-if="srtp.status==4||srtp.status==5">
                        <FormItem>
                            <RadioGroup v-model="opEnd">
                                <Radio label="104">提交结题材料</Radio>
                                <Radio label="103" v-if="srtp.status!=5">提交延期申请</Radio>
                                <Radio label="102">提交终止申请</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <UploadFile buttonTitle="上传相应材料" v-model="endFile"></UploadFile>
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
            srtp: {
                title: "",
                description: "",
                year: "",
                level: 1,
                status: "1"
            },
            opMiddle: "101",
            middleFile: "",
            opEnd: "104",
            endFile: ""
        };
    },
    methods: {
        fetchData() {
            this.$axios
                .get("/api/student/srtp")
                .then(response => {
                    this.srtp = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        submitMiddle() {
            var valid = this.middleFile != "" && this.opMiddle != "";
            if (!valid) this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/student/srtp/update", {
                        operation: parseInt(this.opMiddle),
                        middle_file: this.middleFile
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
            var valid = this.endFile != "" && this.opEnd != "";
            if (!valid) this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/student/srtp/update", {
                        operation: parseInt(this.opEnd),
                        end_file: this.endFile
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
        srtpLevel() {
            if (this.srtp.level == 1) return "院级";
            else if (this.srtp.level == 2) return "市级";
            else return "国家级";
        },
        srtpStatus() {
            var statusName = "";
            switch (this.srtp.status) {
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
                    statusName = "延期进行中";
                    break;
                case 6:
                    statusName = "结题审核中";
                    break;
                case 7:
                    statusName = "已结题";
                    break;
                case 8:
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
.time {
    font-size: 16px;
    font-weight: bold;
}
.content {
    padding-left: 5px;
    padding-top: 10px;
}
</style>
