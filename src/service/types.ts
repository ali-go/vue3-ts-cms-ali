// 总响应类型
export interface IDataType<T = any> {
  code: number;
  data: T;
}
