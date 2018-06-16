<template>
    <Upload ref="upload" action="/api/upload" :on-success="finishUpload" :before-upload="beforeUpload" :on-remove="removeUpload" :headers="tokenHeader">
        <Button type="ghost" icon="ios-cloud-upload-outline">{{title}}</Button>
    </Upload>
</template>

<script>
export default {
    props: {
        buttonTitle: {
            default: "上传文件"
        },
        value: {
            default: ""
        }
    },
    data() {
        return {
            title: this.buttonTitle
        };
    },
    computed: {
        tokenHeader() {
            return {
                Authorization: "Bearer" + localStorage.token
            };
        }
    },
    methods: {
        beforeUpload() {
            this.$refs.upload.clearFiles();
        },
        finishUpload(response, file) {
            this.$emit("input", response.path);
        },
        removeUpload() {
            this.$emit("input", "");
        }
    }
};
</script>

<style>
</style>
