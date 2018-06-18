<template>
    <div class="layout" style="height:100vh;overflow-y:scroll">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo">
                        <span>北京科技大学 - 教务管理</span>
                    </div>
                    <div class="layout-nav">
                        <Dropdown>
                            <a href="javascript:void(0)" style="color:white">
                                <Icon type="person"></Icon>
                                &nbsp {{currentUser.name}}
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem @click.native="logout">注销</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff', height: '100vh'}">
                    <Menu theme="light" width="auto">
                        <Submenu name="1" v-if="currentUser.role===3">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                自动排课
                            </template>
                            <router-link to="/workspace/view-course">
                                <MenuItem name="1-0">查看课表</MenuItem>
                            </router-link>
                        </Submenu>

                        <Submenu name="2" v-if="currentUser.role===3||currentUser.role===1">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                SRTP 管理
                            </template>
                            <router-link to="/workspace/srtp-apply" v-if="currentUser.role===1">
                                <MenuItem name="2-1">我的项目</MenuItem>
                            </router-link>
                            <router-link to="/workspace/srtp-list" v-if="currentUser.role===3">
                                <MenuItem name="2-2">所有项目</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="3" v-if="currentUser.role!=1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                教改项目
                            </template>
                            <router-link to="/workspace/teach-apply" v-if="currentUser.role===2">
                                <MenuItem name="3-1">项目申请</MenuItem>
                            </router-link>
                            <router-link to="/workspace/my-teach-list" v-if="currentUser.role===2">
                                <MenuItem name="3-2">我的项目</MenuItem>
                            </router-link>
                            <router-link to="/workspace/all-teach-list" v-if="currentUser.role===3">
                                <MenuItem name="3-3">所有教改项目</MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="4" v-if="currentUser.role!=3">
                            <template slot="title">
                                <Icon type="briefcase"></Icon>
                                毕业设计
                            </template>
                            <router-link to="/workspace/graduation-manage" v-if="currentUser.role===1">
                                <MenuItem name="4-1">我的毕设</MenuItem>
                            </router-link>
                            <router-link to="/workspace/graduation-list" v-if="currentUser.role===2">
                                <MenuItem name="4-2">我的项目</MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentUser: {
                name: "",
                email: "",
                role: 0
            }
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
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
                        this.currentUser.name = response.data.name;
                        this.currentUser.email = response.data.email;
                        this.currentUser.role = response.data.role;
                    }
                })
                .catch(error => {
                    localStorage.removeItem("token");
                    this.$router.push("/login");
                });
        } else {
            this.$router.push("/login");
        }
    }
};
</script>

<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo {
    height: 40px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
}
.layout-logo span {
    font-size: 24px;
    color: #fff;
    margin: 0 15px;
    position: relative;
    top: -10px;
}
.layout-nav {
    float: right;
    margin-right: 20px;
}
</style>