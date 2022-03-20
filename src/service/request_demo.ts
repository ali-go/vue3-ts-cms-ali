// 案例：

// 测试网络请求
import { alRequest } from "./index";

// 设置请求响应具体格式
interface DataType {
  data: any;
  meta: {
    // msg: string;
    // status: number;
    code: string;
  };
}

// alRequest1
//   .request<DataType>({
//     url: "/login",
//     method: "POST",
//     data: {
//       name: "admin",
//       password: "123456"
//     }
//   })
//   .then((res) => {
//     console.log(res);
//   });
alRequest
  .get<DataType>({
    url: "/login"
    // showLoading: false
  })
  .then((res) => {
    console.log(res);
  });
