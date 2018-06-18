<template>
    <div style="background:#eee;padding-top: 100px;height:100vh">
        <Card :bordered="false" class="login-box">
            <p slot="title" style="text-align:center">注册教学管理系统</p>
            <Form :label-width="80">
                <FormItem label="姓名">
                    <Input v-model="name"></Input>
                </FormItem>
                <FormItem label="学号/工号">
                    <Input v-model="number">
                    <span slot="append">@ustb.edu.com</span>
                    </Input>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" v-model="password"></Input>
                </FormItem>
                <FormItem label="确认密码">
                    <Input type="password" v-model="confirmPassword"></Input>
                </FormItem>
                <FormItem>
                    <Select v-model="role" style="width:200px">
                        <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button @click="doRegister" type="primary" style="margin-right:10px">注册</Button>
                    <router-link to="/login">
                        <Button type="default">登录</Button>
                    </router-link>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            number: "",
            role: 0,
            password: "",
            confirmPassword: "",
            roleList: [
                {
                    value: 0,
                    label: "学生"
                },
                {
                    value: 1,
                    label: "教师"
                },
                {
                    value: 2,
                    label: "秘书"
                }
            ]
        };
    },
    methods: {
        doRegister() {
            //检查密码匹配，学号长度限制
            if (this.name == "") {
                this.$Message.error("姓名不能为空");
                return false;
            }
            if (this.number.length < 4) {
                this.$Message.error("学号/工号长度至少为4");
                return false;
            }
            if (this.password.length < 6) {
                this.$Message.error("密码长度至少为6");
                return false;
            }
            if (this.password != this.confirmPassword) {
                this.$Message.error("两次密码输入不一致");
                return false;
            }
            //提交数据
            this.$axios
                .post("/api/auth/register", {
                    name: this.name,
                    role: this.role,
                    email: this.number + "@ustb.edu.cn",
                    password: this.password
                })
                .then(response => {
                    if (response.data.status == "OK") {
                        this.$Message.success("注册成功，请登录");
                        this.$router.push("/login");
                    } else this.$Message.error(response.data.msg);
                })
                .catch(error => {
                    this.$Message.error("注册失败");
                });
        }
    },
    beforeCreate() {
        //判断是否有有效token
        var token = localStorage.getItem("token");
        if (token && token != "") {
            this.$axios
                .post("/api/auth/me")
                .then(response => {
                    if (response.data.name) {
                        this.$router.push("workspace");
                    }
                })
                .catch(error => {
                    localStorage.removeItem("token");
                    this.$Message.error("登录已过期");
                });
        }
    }
};
</script>

<style>
</style>
