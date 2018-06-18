<template>
    <div>
        <Row>
            <b>简介:</b>
            <span class="expand-value">{{ row.description }}</span>
        </Row>
        <Row>
            <div v-if="row.status==1">
                <h4>申请审核中：</h4>
                <UploadFile buttonTitle="上传任务书" v-model="uploadedTaskFile"></UploadFile>
                <Button type="primary" size="small" @click="submitTaskFile">提交</Button>
            </div>

            <div v-if="row.status==2">
                <h4>等待开题中：</h4>
                <p>任务书：
                    <DownloadFile :fileId="row.task_file"></DownloadFile>
                    <!-- <a href="">{{row.task_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==3">
                <h4>前期进行中：</h4>
                <p>任务书：
                    <DownloadFile :fileId="row.task_file"></DownloadFile>
                    <!-- <a href="">{{row.task_file}}</a> -->
                </p>
                <p>开题报告：
                    <DownloadFile :fileId="row.start_file"></DownloadFile>
                    <!-- <a href="">{{row.start_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==4">
                <h4>后期进行中：</h4>
                <p>任务书：
                    <DownloadFile :fileId="row.task_file"></DownloadFile>
                    <!-- <a href="">{{row.task_file}}</a> -->
                </p>
                <p>开题报告：
                    <DownloadFile :fileId="row.start_file"></DownloadFile>
                    <!-- <a href="">{{row.start_file}}</a> -->
                </p>
                <p>中期报告：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==5">
                <h4>已结题：</h4>
                <p>任务书：
                    <DownloadFile :fileId="row.task_file"></DownloadFile>
                    <!-- <a href="">{{row.task_file}}</a> -->
                </p>
                <p>开题报告：
                    <DownloadFile :fileId="row.start_file"></DownloadFile>
                    <!-- <a href="">{{row.start_file}}</a> -->
                </p>
                <p>中期报告：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
                <p>结题材料：
                    <DownloadFile :fileId="row.end_file"></DownloadFile>
                    <!-- <a href="">{{row.end_file}}</a> -->
                </p>
            </div>
        </Row>
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
    props: {
        row: Object
    },
    data() {
        return {
            uploadedTaskFile: ""
        };
    },
    methods: {
        submitTaskFile() {
            this.$axios
                .patch("/api/teacher/graduation/" + this.row.id + "/update", {
                    operation: 201,
                    task_file: this.uploadedTaskFile
                })
                .then(response => {
                    if (response.data.status == "OK")
                        this.$Message.success("提交成功");
                    else this.$Message.error("提交失败");
                    this.$emit("processed");
                })
                .catch(error => {
                    this.$Message.error("提交出错");
                });
        }
    }
};
</script>

<style>
</style>
