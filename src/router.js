import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";
import Workspace from "./views/Workspace.vue";

import BlankSpace from "./components/BlankSpace.vue";
// 排课组件
import ViewCourse from "./components/CourseArrangement/ViewCourse.vue";
import DoArrange from "./components/CourseArrangement/DoArrange.vue";
// SRTP组件
import SrtpApply from "./components/SRTP/SrtpApply.vue";
import SrtpList from "./components/SRTP/SrtpList.vue";
import SrtpDetail from "./components/SRTP/SrtpDetail";
//教改组件
import TeachApply from "./components/Teach/TeachApply.vue";
import TeachMyList from "./components/Teach/TeachMyList.vue";
import TeachAllList from "./components/Teach/TeachAllList.vue";
import TeachDetail from "./components/Teach/TeachDetail.vue";
//毕设组件
import GraApply from "./components/Graduation/GraApply.vue";
import GraManage from "./components/Graduation/GraManage.vue";
import GraList from "./components/Graduation/GraList.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/workspace",
            name: "workspace",
            component: Workspace,
            children: [
                {
                    path: "",
                    component: BlankSpace
                },
                {
                    path: "view-course",
                    component: ViewCourse
                },
                {
                    path: "srtp-apply",
                    component: SrtpApply
                },
                {
                    path: "srtp-list",
                    component: SrtpList
                },
                {
                    path: "srtp-detail",
                    component: SrtpDetail
                },
                {
                    path: "teach-apply",
                    component: TeachApply
                },
                {
                    path: "teach-detail/:id",
                    component: TeachDetail
                },
                {
                    path: "my-teach-list",
                    component: TeachMyList
                },
                {
                    path: "all-teach-list",
                    component: TeachAllList
                },
                {
                    path: "graduation-apply",
                    component: GraApply
                },
                {
                    path: "graduation-manage",
                    component: GraManage
                },
                {
                    path: "graduation-list",
                    component: GraList
                }
            ]
        }
    ]
});
