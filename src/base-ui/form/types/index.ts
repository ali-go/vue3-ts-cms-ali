// 表单类型
type IFormType = "input" | "password" | "select" | "datepicker";
// 下拉框类型
type IOptins = {
  label: string;
  value: string | number | null;
};
// 接收form-item属性类型
export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: IOptins[];
  // 针对特殊的属性
  otherOptions?: any;
  // 是否隐藏
  isHidden?: boolean;
}
// 整合所有form的属性类型
export interface IForm {
  formItems: IFormItem[]; //item的数据类型
  labelWidth?: string; //form的label宽度
  styleItem?: any; //所有form-item的样式
  colLayout: any; //col中根据屏幕比例占的份数
}
