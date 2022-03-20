import { IForm } from "@/base-ui/form/types";
// 存放user页面表单查询模块的需要传递给公共组件AlForm的配置参数
export const searchFormConfig: IForm = {
  // 渲染数据
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称"
    },
    {
      field: "oldPrice",
      type: "input",
      label: "原价格",
      placeholder: "请输入原价格"
    },
    {
      field: "newPrice",
      type: "input",
      label: "现价格",
      placeholder: "请输入现价格"
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeholder: "请选择状态",
      options: [
        { label: "下架", value: "0" },
        { label: "上架", value: "1" }
      ]
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
