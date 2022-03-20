import { IUserInfo } from "@/service/login/types";
// login登录获取的数据类型
export interface ILoginState {
  token: string;
  // userInfo: any;
  userInfo: IUserInfo;
  userMenus: any;
  permission: any[];
}
