import { ITable } from "@/base-ui/table";

// 存放user模块table表格的一些配置信息
export const contentTableConfig: ITable = {
  // 渲染表格字段
  propsList: [
    { prop: "name", label: "用户名", minWidth: "160" },
    { prop: "type", label: "类型", minWidth: "80" },
    { prop: "icon", label: "菜单icon", minWidth: "220" },
    { prop: "url", label: "菜单url", minWidth: "200" },
    { prop: "permission", label: "按钮权限", minWidth: "140" },
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
  title: "菜单列表",
  // 特殊属性(此处用多层表属性)
  childrenProps: {
    rowKey: "id",
    treeProps: {
      children: "children"
    }
  }
};
