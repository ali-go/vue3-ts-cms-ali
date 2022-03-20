// 编辑新增弹框的hooks
import { ref } from "vue";
import PageModal from "@/components/page-modal";

// 定义函数类型
type CallBackFn = (data: any) => void;

export const userPageModal = (newCb?: CallBackFn, editCb?: CallBackFn) => {
  // 0.查询参数存储一份，用于列表模块删除、新增、编辑之后重新根据参数更新列表数据
  const searchInfo = ref({});

  // (1)获取传递的数据
  const defaultInfo = ref({});
  // (2) 获取dialog的ref
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  // (3)新增
  const handlerNewClick = (info: any) => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb({});
    searchInfo.value = info;
  };
  // (4)编辑
  const handlerEditClick = (row: any, info: any) => {
    defaultInfo.value = { ...row };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb(row);
    searchInfo.value = info;
    console.log(info);
  };
  return [
    pageModalRef,
    defaultInfo,
    searchInfo,
    handlerNewClick,
    handlerEditClick
  ];
};
