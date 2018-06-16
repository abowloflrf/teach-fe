<template>
    <div style="background:#eee;padding-top: 100px;height:100vh">
        <Card :bordered="false" class="login-box">
            <p slot="title" style="text-align:center">登录教学管理系统</p>
            <Form :label-width="80">
                <FormItem label="学号/工号">
                    <Input v-model="number"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" v-model="password"></Input>
                </FormItem>
                <FormItem>
                    <Button @click="doLogin" type="primary">登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            number: "1000",
            password: "password"
        };
    },
    methods: {
        doLogin() {
            this.$axios
                .post("/api/auth/login", {
                    email: this.number + "@ustb.edu.cn",
                    password: this.password
                })
                .then(response => {
                    localStorage.setItem("token", response.data.access_token);
                    this.$axios.defaults.headers.common["Authorization"] =
                        "Bearer" + localStorage.token;
                    this.$router.push("workspace");
                })
                .catch(error => {
                    this.$Message.error("登录失败");
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
.login-box {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px 20px;
}
</style>