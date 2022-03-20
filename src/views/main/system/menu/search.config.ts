import { IForm } from "@/base-ui/form/types";
// 存放user页面表单查询模块的需要传递给公共组件AlForm的配置参数
export const searchFormConfig: IForm = {
  // 渲染数据
  formItems: [
    {
      field: "name",
      type: "input",
      label: "菜单名称",
      placeholder: "请输入菜单名称"
    },
    {
      field: "type",
      type: "select",
      label: "类型",
      placeholder: "请选择菜单类型",
      options: [
        { label: "一级菜单", value: "1" },
        { label: "二级菜单", value: "2" }
      ]
    },
    {
      field: "url",
      type: "input",
      label: "菜单url",
      placeholder: "请输入菜单url"
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间",
        type: "daterange"
      }
    }
  ],
  // 表单标签的宽度
  labelWidth: "120px",
  // 表单的样式
  styleItem: {
    padding: "10px 5px"
  },
  // 根据屏幕宽度设置栅格布局col份数
  colLayout: {
    xl: 6, //>=1920时
    lg: 8, //>=1200时
    md: 12, //>=992时
    sm: 24, //>=768时
    xs: 24 //<768时
  }
};
