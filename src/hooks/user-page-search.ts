import { ref } from "vue";
import PageContent from "@/components/page-content";

export function userPageSearch() {
  // 1.获取page-content的ref
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  // 2.重置直接调用列表接口
  const handleResetClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  // 3.查询带参数调用列表接口
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  return [pageContentRef, handleResetClick, handleQueryClick];
}
