import { IBreadcrumb } from "@/base-ui/breadcrumb/types";

// 处理后台获取的菜单，进行统一处理
// 1.加载所有的routes
// 2.根据权限筛选当前用户的routes
import { RouteRecordRaw } from "vue-router";
let firstMenu: any = null; //定义首菜单，用于/main重定向(在全局导航守卫中设置)
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []; //存放根据权限筛选后的路由
  // 1.加载所有的routes
  const allRoutes: RouteRecordRaw[] = []; //存放所有
  const routesFile = require.context("../router/main", true, /\.ts/);
  routesFile.keys().forEach((key) => {
    // (1)key为每一个文件相对于router/main的路径，如./analysis/dashboard/dashboard.ts
    // (2)进行路径拼接，获得每个文件相对于当前mapMenusToRoutes.ts的路径，并使用require导入组件模块
    // console.log(key);
    const route = require("../router/main" + key.split(".")[1]); //组件存放在default属性中
    allRoutes.push(route.default);
  });
  // 2.根据菜单获取需要添加的routes(type为1是父菜单，为2是子菜单，3是权限按钮，此处为2就执行完毕)
  // (1)定义递归函数
  const _recurseGetRoutes = (userMenus: any[]) => {
    for (const menu of userMenus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = route;
        }
      } else {
        _recurseGetRoutes(menu.children);
      }
    }
  };
  // (2)调用函数
  _recurseGetRoutes(userMenus);
  return routes;
}
// 导出第一个菜单
export { firstMenu };

// 获取当前菜单的面包屑数组数据
export function pathMapBreadcrumbs(menus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(menus, currentPath, breadcrumbs);
  return breadcrumbs;
}
// 获取当前菜单（1.用于刷新页面时更新菜单栏的选中状态；2.补充需求：中间操作获取面包屑数组(改造方法)）
export function pathMapToMenu(
  menus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      // 获取二级菜单
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        // 获取面包屑数据
        breadcrumbs?.push({ name: menu.name }); //由于此处父级菜单不进行跳转，此处不能加path，否则会跳到404
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      // 获取二级菜单
      return menu;
    }
  }
}

// 获取菜单按钮权限信息(收集所有权限按钮的信息，在vuex的权限菜单处理最后调用)
export function mapMenusToPermission(userMenus: any[]) {
  const permission: string[] = [];
  const _recurseGetPerssion = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPerssion(menu.children ?? []);
      } else if (menu.type === 3) {
        permission.push(menu.permission);
      }
    }
  };
  _recurseGetPerssion(userMenus);
  return permission;
}

// 获取编辑角色时原有的菜单数组
export function menuMapLeafkeys(menuList: any[]) {
  const leafKeys: any[] = [];
  const _recurseGetLeafKeys = (menus: any[]) => {
    for (const item of menus) {
      if (item.children) {
        _recurseGetLeafKeys(item.children);
      } else {
        leafKeys.push(item.id);
      }
    }
  };
  _recurseGetLeafKeys(menuList);
  return leafKeys;
}
