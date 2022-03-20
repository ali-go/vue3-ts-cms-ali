import { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";

import { ComponentInternalInstance } from "vue";
import { IDashboard } from "./main/analysis/type";

// 根state的类型
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  currentInstance: ComponentInternalInstance | null;
  menuList: any[];
}

// 获取其他所有module模块的state类型
export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboard;
}
// 使用useStore获取的store的state中数据类型(封装类型：包含根state及所有模块的state类型)
export type IStoreType = IRootState & IRootWithModule;
