import { ITable } from "@/base-ui/table";

// 存放user模块table表格的一些配置信息
export const contentTableConfig: ITable = {
  // 渲染表格字段
  propsList: [
    { prop: "name", label: "商品名称", minWidth: "180" },
    {
      prop: "oldPrice",
      label: "原价格",
      minWidth: "180",
      slotName: "oldPrice"
    },
    {
      prop: "newPrice",
      label: "现价格",
      minWidth: "180",
      slotName: "newPrice"
    },
    { prop: "imgUrl", label: "商品图片", minWidth: "180", slotName: "image" },
    { prop: "status", label: "状态", minWidth: "180", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "180",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "180",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "160",
      slotName: "handler"
    }
  ],
  // 表格标题
  title: "商品列表",
  // 是否显示序号
  showIndex: true,
  // 是否显示多选按钮
  showSelection: true
};
