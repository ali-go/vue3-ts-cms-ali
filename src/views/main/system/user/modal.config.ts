import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "password",
      type: "password",
      label: "密码",
      placeholder: "请输入密码",
      isHidden: true
    },
    {
      field: "cellphone",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    },
    {
      field: "roleId",
      type: "select",
      label: "角色",
      placeholder: "请选择角色",
      options: []
    },
    {
      field: "departmentId",
      type: "select",
      label: "部门",
      placeholder: "请选择部门",
      options: []
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
