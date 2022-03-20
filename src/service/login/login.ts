import { alRequest } from "../index";
import { IAccount, ILoginResult, IUserInfo } from "./types";
import { IDataType } from "../types";
// 定义枚举类：存放登录的请求api
enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // /users/ + id
  UserMenus = "/role/" // /role/ + role + /menu
}
// 1.账户登录接口
export function accountLoginRequest(account: IAccount) {
  return alRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  });
}
// 2.用户信息接口
export function requestUserInfoById(id: number) {
  return alRequest.get<IDataType<IUserInfo>>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  });
}
// 3.用户信息接口(此处省略数据了IDataType中data的数据类型默认为any)
export function requestUserMenusByRoleId(roleId: number) {
  return alRequest.get<IDataType>({
    url: LoginApi.UserMenus + roleId + "/menu",
    showLoading: false
  });
}
