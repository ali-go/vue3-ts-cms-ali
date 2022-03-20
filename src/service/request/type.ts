import { AxiosRequestConfig, AxiosResponse } from "axios";

/* 为了增加扩展性，我们让实例传递拦截器函数，也就是实例需要传递默认的AxiosRequestConfig
类型的参数，同时要具备拦截器中函数参数类型，因此此处需要进行一些操作，去扩展实例传递的
参数类型 */
// 1.汇总拦截器各函数的参数类型
interface ALRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
// 2.重构总的参数类型
interface ALRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ALRequestInterceptors<T>;
  showLoading?: boolean;
}

export { ALRequestConfig, ALRequestInterceptors };
