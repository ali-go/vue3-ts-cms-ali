// 对axios进行二次封装
import axios from "axios";
import { AxiosInstance } from "axios";
import type { ALRequestConfig, ALRequestInterceptors } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import LocalCache from "@/utils/cache";
const DEFAULT_LOADING = true; //设置默认不加载loading
// 请求的封装类
class ALRequest {
  //1.构建属性axios的实例及自定义的拦截器函数
  instance: AxiosInstance;
  interceptors?: ALRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;
  //2.构造器创建实例初始化公共参数
  constructor(config: ALRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 3.封装实例特有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 5.添加所有请求公共的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = LocalCache.getCache("token") ?? "";
        // 由于headers没有内置Authorization属性，因此前面加!强调有该属性，否则ts检测会报错
        config.headers!.Authorization = `Bearer ${token}`;
        // 加载loading;
        console.log(this.showLoading);

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (config) => {
        this.loading?.close();
        return config.data;
      },
      (error) => {
        this.loading?.close();
        return error;
      }
    );
  }
  // //4.封装请求(普通)
  // request(config: AxiosRequestConfig): void {
  //   this.instance.request(config).then((res) => {
  //     console.log(res);
  //   });
  // }
  //4.封装请求(细化到对单个请求的拦截器进行处理)
  request<T = any>(config: ALRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.如果单个请求携带了自定义的拦截器，则对参数进行拦截器处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 2.判断是否需要展示loading(注意此处是请求前，还未开始执行上面的请求拦截)
      if (config.showLoading == false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
            // 重置loading为true，这样不会影响下一个请求
            this.showLoading = DEFAULT_LOADING;
          }
          resolve(res);
        })
        .catch((err) => {
          // 重置loading为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  get<T = any>(config: ALRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: ALRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: ALRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: ALRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default ALRequest;
