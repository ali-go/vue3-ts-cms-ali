import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupStore } from "./store";
import { alRequest } from "./service"; //封装请求
// import "./service/request_demo";//测试案例
// import ElementPlus from "element-plus"; //全部导入
// import "element-plus/theme-chalk/index.css"; //全部导入
import { registerApp } from "./global/index"; //使用局部注册的方式
import "element-plus/theme-chalk/base.css";

import "normalize.css";
import "./assets/css/index.less";
const app = createApp(App);
setupStore(); //刷新时恢复vuex数据(必须放在app.use(router)上方先执行，否则刷新的时候匹配不到路由地址)
app.use(router);
app.use(store);
registerApp(app); //传递app参数
// app.use(ElementPlus); //全部注册
app.mount("#app");
