type TableColumnAlign = "left" | "center" | "right";

// 列表每个字段的对象类型
export interface IPropsTable {
  prop?: string;
  label: string;
  minWidth?: string;
  slotName?: string;
  align?: TableColumnAlign;
}

// 表格属性字段的类型
export interface ITable {
  propsList: IPropsTable[];
  title?: string;
  showIndex?: boolean;
  showSelection?: boolean;
  childrenProps?: any;
}
