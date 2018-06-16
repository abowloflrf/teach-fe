import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "./style/change.css";
Vue.prototype.$axios = axios;
if (localStorage.token) {
    Vue.prototype.$axios.defaults.headers.common["Authorization"] =
        "Bearer" + localStorage.token;
}
Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
