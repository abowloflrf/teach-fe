<template>
    <div>
        <h1>SRTP 项目提交</h1>
        <Form :label-width="80" v-if="!hasProject">
            <FormItem label="项目标题">
                <Input v-model="srtpTitle"></Input>
            </FormItem>
            <FormItem label="项目年度">
                <DatePicker v-model="srtpYear" type="year" placeholder="选择年份"></DatePicker>
            </FormItem>
            <!-- <FormItem label="开始时间">
                <DatePicker v-model="srtpStartTime" type="month" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem label="持续时间">
                <RadioGroup v-model="srtpLatestTime">
                    <Radio label="1">半年</Radio>
                    <Radio label="2">一年</Radio>
                </RadioGroup>
            </FormItem> -->
            <FormItem label="项目简介">
                <Input v-model="srtpDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="项目级别">
                <RadioGroup v-model="srtpLevel">
                    <Radio label="1">院级</Radio>
                    <Radio label="2">推荐校级</Radio>
                    <Radio label="3">推荐市级</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="指导老师">
                <Select v-model="srtpTeacher" filterable>
                    <Option v-for="item in teacherList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem label="所有成员">
                <Input v-model="srtpMembers"></Input>
            </FormItem>
            <FormItem lable="上传详细申请表">
                <Upload ref="upload" action="/api/upload" :on-success="finishUpload" :before-upload="beforeUpload" :on-remove="removeUpload" :headers="tokenHeader">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传详细申请表</Button>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="postLoading" @click="submitApply">提交申请</Button>
            </FormItem>
        </Form>
        <div v-else>
            <p>您已创建过SRTP项目</p>
            <router-link to="/workspace/srtp-detail">
                <Button>点击查看我的项目</Button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            srtpTitle: "",
            srtpYear: "",
            srtpStartTime: "",
            srtpLatestTime: "",
            srtpDesc: "",
            srtpLevel: "1",
            srtpTeacher: null,
            srtpMembers: "",
            srtpApplyFile: "",
            srtpApplyFileName: "",
            uploadedFiles: [],
            teacherList: [2],
            postLoading: false,
            hasProject: false
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
        submitApply(name) {
            var valid =
                this.srtpTitle != "" &&
                this.srtpYear != "" &&
                this.srtpDesc != "" &&
                this.srtpLevel != "" &&
                this.srtpLevel != "" &&
                this.srtpTeacher != "" &&
                this.srtpApplyFile != "";
            if (!valid) this.$Message.error("请填写完整!");
            else {
                this.postLoading = true;
                this.$axios
                    .post("/api/student/srtp", {
                        title: this.srtpTitle,
                        level: this.srtpLevel,
                        year: this.srtpYear.getFullYear(),
                        teacher: this.srtpTeacher,
                        description: this.srtpDesc,
                        members: this.srtpMembers,
                        apply_file: this.srtpApplyFile
                    })
                    .then(response => {
                        this.postLoading = false;
                        if (response.data.status == "OK") {
                            //提交成功
                            this.$Message.success("提交申请成功！");
                            this.$router.push("/workspace/srtp-detail");
                        } else {
                            this.$Message.error(response.data.msg);
                        }
                    })
                    .catch(error => {
                        this.postLoading = false;
                        this.$Message.error("请求出错");
                    });
            }
        },
        beforeUpload() {
            this.$refs.upload.clearFiles();
        },
        finishUpload(response, file) {
            this.srtpApplyFile = response.path;
            this.srtpApplyFileName = file.name;
        },
        removeUpload() {
            this.srtpApplyFile = "";
            this.srtpApplyFileName = "";
        }
    },
    beforeMount() {
        //检查是否已经创建过SRTP项目并跳转
        this.$axios.get("/api/student/srtp").then(response => {
            if (Object.keys(response.data).length != 0) {
                this.hasProject = true;
            }
        });
    }
};
</script>

<style>
</style>
