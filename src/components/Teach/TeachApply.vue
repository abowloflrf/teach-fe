<template>
    <div>
        <h1>教改 项目申请</h1>
        <Form>
            <FormItem label="项目标题">
                <Input v-model="formItem.teachTitle"></Input>
            </FormItem>
            <FormItem label="项目简介">
                <Input v-model="formItem.teachDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="项目年度">
                <DatePicker v-model="formItem.teachYear" type="year" placeholder="选择年份"></DatePicker>
            </FormItem>
            <FormItem label="项目级别">
                <RadioGroup v-model="formItem.teachLevel">
                    <Radio label="1">院级</Radio>
                    <Radio label="2">市级</Radio>
                    <Radio label="3">国家级</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <UploadFile buttonTitle="上传教改项目申请书" v-model="formItem.teachApplyFile"></UploadFile>
            </FormItem>
            <Button type="primary" @click="submitApply" :loading="postLoading">提交申请</Button>
        </Form>
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
            formItem: {
                teachTitle: "",
                teachDesc: "",
                teachYear: "",
                teachLevel: "1",
                teachApplyFile: ""
            },
            postLoading: false
        };
    },
    methods: {
        submitApply() {
            var valid =
                this.formItem.teachTitle != "" &&
                this.formItem.teachDesc != "" &&
                this.formItem.teachYear != "" &&
                this.formItem.teachLevel != "" &&
                this.formItem.teachApplyFile != "";
            if (!valid) {
                this.$Message.error("请填写完整!");
                return false;
            }
            this.$axios
                .post("/api/teacher/teach", {
                    title: this.formItem.teachTitle,
                    description: this.formItem.teachDesc,
                    level: this.formItem.teachLevel,
                    year: this.formItem.teachYear.getFullYear(),
                    apply_file: this.formItem.teachApplyFile
                })
                .then(response => {
                    this.postLoading = false;
                    if (response.data.status == "OK") {
                        //提交成功
                        this.$Message.success("教改项目创建成功！");
                        this.$router.push("/workspace/my-teach-list");
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                })
                .catch(error => {
                    this.postLoading = false;
                    this.$Message.error("请求出错");
                });
        }
    }
};
</script>

<style>
</style>
