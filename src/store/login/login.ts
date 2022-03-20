import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import LocalCache from "@/utils/cache";
import router from "@/router";
import { mapMenusToPermission, mapMenusToRoutes } from "@/utils/map-menus";
import { IUserInfo } from "@/service/login/types";
// Module接受两个泛型，第一个是当前模块state的类型，第二个是store中state的类型
// login模块的module
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      // userInfo: {},
      userInfo: {} as IUserInfo, //此处利用断言设置类型
      userMenus: [],
      permission: [] //存储按钮权限信息
    };
  },
  mutations: {
    // 获取token
    changeToken(state, token: string) {
      state.token = token;
    },
    // 获取用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    // 获取用户角色菜单
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // (1).获取权限菜单
      const routes = mapMenusToRoutes(userMenus);
      // (2).动态路由追加
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      // (3).获取菜单的按钮权限信息
      const perssion = mapMenusToPermission(userMenus);
      state.permission = perssion;
    }
  },
  actions: {
    // 1、处理账户登录逻辑
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      LocalCache.setCache("token", token);

      // 2、请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      LocalCache.setCache("userInfo", userInfo);
      // 3.获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      LocalCache.setCache("userMenus", userMenus);
      // 4.跳到首页
      router.push("/main");
    },
    // 页面刷新时重新赋值vuex数据(刷新数据丢失，重新获取)
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 登录成功后可调用获取全局初始化的一些数据
        dispatch("getInitialDataActin", null, { root: true });
      }
      const userInfo = LocalCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = LocalCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
    // 手机登录逻辑
    // phoneLoginAction({ commit }, paylod: any) {
    //   console.log("处理手机登录的逻辑");
    // }
  }
};

export default loginModule;
