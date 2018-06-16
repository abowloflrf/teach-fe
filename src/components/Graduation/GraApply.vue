<template>
    <div>
        <h1>毕业项目申请</h1>
        <Form>
            <FormItem label="毕设题目">
                <Input v-model="graduationTitle"></Input>
            </FormItem>
            <FormItem label="毕设简介">
                <Input v-model="graduationDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="毕业年">
                <DatePicker v-model="graduationYear" type="year" placeholder="选择年份"></DatePicker>
            </FormItem>
            <FormItem label="指导老师">
                <Select v-model="graduationTeacher" filterable>
                    <Option v-for="item in teacherList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <Button type="primary" @click="submitApply" :loading="postLoading">提交申请</Button>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            graduationTitle: "",
            graduationYear: "",
            graduationDesc: "",
            graduationTeacher: null,
            teacherList: [2],
            postLoading: false,
            hasGraduation: false
        };
    },
    methods: {
        submitApply(name) {
            var valid =
                this.graduationTitle != "" &&
                this.graduationYear != "" &&
                this.graduationDesc != "" &&
                this.graduationTeacher != "";
            if (!valid) this.$Message.error("请填写完整!");
            else {
                this.postLoading = true;
                this.$axios
                    .post("/api/student/graduation", {
                        title: this.graduationTitle,
                        description: this.graduationDesc,
                        year: this.graduationYear.getFullYear(),
                        teacher: this.graduationTeacher
                    })
                    .then(response => {
                        this.postLoading = false;
                        if (response.data.status == "OK") {
                            //提交成功
                            this.$Message.success("毕业项目创建成功！");
                            this.$router.push("/workspace/graduation-manage");
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
    },
    beforeMount() {
        this.$axios
            .get("/api/student/graduation")
            .then(response => {
                if (Object.keys(response.data).length != 0) {
                    this.hasGraduation = true;
                    this.$Message.warning("您已经创建过毕业项目");
                    this.$router.push("/workspace/graduation-manage");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>

<style>
</style>
