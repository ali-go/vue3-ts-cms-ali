// 处理各菜单的按钮是否有权限：拿所有的按钮和接收后台菜单返的页面按钮权限信息比对
import { useStore } from "@/store";
export function userPermission(pageName: string, handleName: string) {
  const store = useStore();
  const permission = store.state.login.permission;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return !!permission.find((item) => item === verifyPermission);
}
