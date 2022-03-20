import { Module } from "vuex";
import { ISystemState } from "./types";
import { IRootState } from "@/store/types";
import {
  deletePageListData,
  getPageListData,
  addPageListData,
  editPageListData
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  mutations: {
    // 1.用户信息模块
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    // 2.权限模块
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    // 2.商品模块
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    // 3.菜单模块
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    }
  },
  getters: {
    // 注意：1.为了方便页面也根据pageName标识拿对应的列表数据，此处设置一个统一的getters，用于返回数据，同下面注意一样此处未用switch
    //       2.getter可以返回一个函数，也可以直接返回值，此处为了接收标识，采用返回函数形式
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`];
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`];
    }
  },
  actions: {
    // 1.system模块不同菜单的统一获取列表接口
    async getPageListAction({ commit }, payload: any) {
      //注意： 此处下面操作由于接口设计的原因可以直接拼接地址，但如果实际其他开发中如果接口并没有规律，则可用switch处理
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // 2.页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // 3.更新数据
      const { list, totalCount } = pageResult.data;
      // 获取首字母大小转换后的pageName
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
    // 2.列表删除
    async deletePageListAction({ dispatch }, payload: any) {
      //注意： 此处下面操作由于接口设计的原因可以直接拼接地址，但如果实际其他开发中如果接口并没有规律，则可用switch处理
      // 1.获取pageUrl
      const { pageName, id, queryInfo } = payload;
      const pageUrl = `/${pageName}/${id}`;
      // 2.页面发送请求
      await deletePageListData(pageUrl);
      // 3.更新数据
      dispatch("getPageListAction", { pageName, queryInfo });
    },
    // 3.列表新增
    async addPageListAction({ dispatch, rootState }, payload: any) {
      const { pageName, newData, queryInfo } = payload;
      const pageUrl = `/${pageName}`;
      try {
        await addPageListData(pageUrl, newData);
        rootState.currentInstance?.appContext.config.globalProperties.$message.success(
          "新建成功"
        );
        dispatch("getPageListAction", { pageName, queryInfo });
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // 4.列表编辑
    async editPageListAction({ dispatch, rootState }, payload: any) {
      const { pageName, editData, id, queryInfo } = payload;
      const pageUrl = `/${pageName}/${id}`;
      try {
        await editPageListData(pageUrl, editData);
        rootState.currentInstance?.appContext.config.globalProperties.$message.success(
          "修改成功"
        );
        dispatch("getPageListAction", { pageName, queryInfo });
        console.log(queryInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default systemModule;
