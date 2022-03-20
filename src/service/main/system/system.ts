import { alRequest } from "../../index";
import { IDataType } from "../../types";
// 1.获取列表数据/${pageName}/list
export function getPageListData(url: string, queryInfo: any) {
  return alRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
// 2.删除列表数据 /${pageName}/${id}
export function deletePageListData(url: string) {
  return alRequest.delete<IDataType>({
    url: url
  });
}
// 3.新增列表数据 /${pageName}
export function addPageListData(url: string, newData: any) {
  return alRequest.post<IDataType>({
    url: url,
    data: newData
  });
}
// 2.编辑列表数据 /${pageName}/${id}
export function editPageListData(url: string, editData: any) {
  return alRequest.patch<IDataType>({
    url: url,
    data: editData
  });
}
