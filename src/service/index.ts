// 网络请求的入口文件(模拟接口地址：https://httpbin.org/)
// import axios from "axios";
// axios
//   .request({
//     url: "https://httpbin.org/get",
//     method: "GET"
//   })
//   .then((res) => {
//     console.log(res);
//   });
import ALRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

// 请求实例1：
const alRequest = new ALRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (config) => {
      return config;
    },
    responseInterceptorCatch: (error) => {
      return error;
    }
  }
});

export { alRequest };
