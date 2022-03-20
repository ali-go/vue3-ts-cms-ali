import { getPageListData } from "@/service/main/system/system";
import { createStore, Store, useStore as useVuexStore } from "vuex";
import login from "./login/login";
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";
import { IRootState, IStoreType } from "./types";

import { ComponentInternalInstance } from "vue";
const store = createStore<IRootState>({
  state: () => {
    return {
      name: "ali",
      age: 18,
      entireDepartment: [], //部分下拉数据
      entireRole: [], //角色下拉数据
      currentInstance: null, //组件实例
      menuList: [] //全部菜单
    };
  },
  mutations: {
    // 获取vue组件实例对象，获取全局变量
    getCurrentInstance(state, currentInstance: ComponentInternalInstance) {
      state.currentInstance = currentInstance;
      console.log(currentInstance);
    },
    // 更新部门列表
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    // 更新角色列表
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    // 获取全部菜单数据(用于角色分配菜单权限)
    changeMenuList(state, menuList) {
      state.menuList = menuList;
    }
  },
  actions: {
    // 初始化一些数据请求：（部分下拉、角色下拉）:登录成功后调用
    async getInitialDataActin({ commit }) {
      // 部门列表
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 10000
      });
      const { list: departmentList } = departmentResult.data;
      commit("changeEntireDepartment", departmentList);
      // 角色列表
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 10000
      });
      const { list: roleList } = roleResult.data;
      commit("changeEntireRole", roleList);

      // 全部菜单
      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;
      commit("changeMenuList", menuList);
    }
  },
  getters: {},
  modules: {
    login,
    system,
    dashboard
  }
});
// 页面刷新重新赋值各模块的数据，进行恢复(放在store=>index.ts中方便管理所有模块)
export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}
// 自定义封装useStore:使用官网暴露的useStore获取的store后面接state后不会提示state中的数据为Store<any>，即不会检验属性存在，因此进行封装，指定返回值的类型Store<类型>
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
export default store;
