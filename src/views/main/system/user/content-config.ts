import { ITable } from "@/base-ui/table";

// 存放user模块table表格的一些配置信息
export const contentTableConfig: ITable = {
  // 渲染表格字段
  propsList: [
    { prop: "name", label: "用户名", minWidth: "180" },
    { prop: "realname", label: "真实姓名", minWidth: "180" },
    { prop: "cellphone", label: "手机号码", minWidth: "180" },
    { prop: "enable", label: "状态", minWidth: "180", slotName: "enable" },
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
  title: "用户列表",
  // 是否显示序号
  showIndex: true,
  // 是否显示多选按钮
  showSelection: true
};
