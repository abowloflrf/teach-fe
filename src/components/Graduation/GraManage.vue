<template>
    <div>
        <h1>我的毕业项目管理</h1>
        <div v-if="!hasGraduation">
            <p>还没有毕业项目</p>
            <router-link to="/workspace/graduation-apply">
                <Button>点击创建</Button>
            </router-link>
        </div>
        <Timeline v-else>
            <TimelineItem>
                <p class="time">项目基本信息</p>
                <div class="content">
                    <p>
                        <b>毕设题目：</b>{{graduation.title}}</p>
                    <p>
                        <b>简介：</b>{{graduation.description}}</p>
                    <p>
                        <b>毕业年：</b>{{graduation.year}}</p>
                    <p>
                        <b>指导教师：</b>{{graduation.teacher}}</p>
                    <p>
                        <b>当前进度：</b>
                        <Tag color="green">{{graduationStatus}}</Tag>
                    </p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">项目申请</p>
                <div class="content">
                    <p v-if="graduation.status>1&&graduation.task_file!=''">任务书：
                        <a href="">{{graduation.task_file}}</a>
                    </p>
                    <p v-else>等待老师审核上传任务书</p>
                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">开题管理</p>
                <div class="content">
                    <p v-if="graduation.start_file!=''">已上传：
                        <a href="">{{graduation.start_file}}</a>
                    </p>
                    <Form v-if="graduation.status==2">
                        <FormItem>
                            <UploadFile buttonTitle="上传开题报告" v-model="startFile"></UploadFile>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="submitStart">提交</Button>
                        </FormItem>
                    </Form>

                </div>
            </TimelineItem>
            <TimelineItem>
                <p class="time">中期管理</p>
                <div class="content">
                    <p v-if="graduation.status>3&graduation.middle_file!=''">已上传：
                        <a href="">{{graduation.middle_file}}</a>
                    </p>
                    <Form v-if="graduation.status==3">
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
                    <p v-if="graduation.status==5&&graduation.end_file!=''">已上传：
                        <a href="">{{graduation.end_file}}</a>
                    </p>
                    <Form v-if="graduation.status==4">
                        <FormItem>
                            <UploadFile buttonTitle="上传结题材料" v-model="endFile"></UploadFile>
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

export default {
    components: {
        UploadFile
    },
    data() {
        return {
            graduation: {
                title: "",
                description: "",
                year: "",
                status: 1
            },
            startFile: "",
            middleFile: "",
            endFile: "",
            hasGraduation: false
        };
    },
    methods: {
        fetchData() {
            this.$axios
                .get("/api/student/graduation")
                .then(response => {
                    if (Object.keys(response.data).length != 0) {
                        this.hasGraduation = true;
                    }
                    this.graduation = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        submitStart() {
            if (this.startFile == "") this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/student/graduation/update", {
                        operation: 101,
                        start_file: this.startFile
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
        submitMiddle() {
            if (this.middleFile == "") this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/student/graduation/update", {
                        operation: 102,
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
            if (this.endFile == "") this.$Message.error("提交内容不能为空");
            else {
                this.$axios
                    .patch("/api/student/graduation/update", {
                        operation: 103,
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
        graduationStatus() {
            var statusName = "";
            switch (this.graduation.status) {
                case 1:
                    statusName = "等待审核中";
                    break;
                case 2:
                    statusName = "等待开题中";
                    break;
                case 3:
                    statusName = "前期进行中";
                    break;
                case 4:
                    statusName = "后期进行中";
                    break;
                case 5:
                    statusName = "已结题";
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
