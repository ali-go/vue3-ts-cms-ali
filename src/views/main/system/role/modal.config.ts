import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名"
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请输入权限介绍"
    }
  ],
  // 表单标签的宽度
  labelWidth: "100px",
  // 表单的样式
  styleItem: {
    padding: "0px"
  },
  // 根据屏幕宽度设置栅格布局col份数
  colLayout: {
    span: 24
  }
};
