<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchResetClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @handlerNewClick="handlerNewClick"
      @handlerEditClick="handlerEditClick"
    >
      <!-- 页面特有的插槽 -->
      <!-- 1.状态 -->
      <template #enable="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigResult"
      ref="pageModalRef"
      pageName="users"
      :searchInfo="searchInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./search.config";
import { contentTableConfig } from "./content-config";
import { modalConfig } from "./modal.config";

import { userPageSearch } from "@/hooks/user-page-search";
import { userPageModal } from "@/hooks/user-page-modal";

import { useStore } from "@/store";
export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore();
    // 1.获取封装的hooks函数:查询模块的
    const [pageContentRef, handleResetClick, handleQueryClick] =
      userPageSearch();

    // 2.由于新增和编辑可能需要展示的formItem项会有差异，封装部分回调函数去执行：此处根据实际情况编辑不需要密码
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };
    // 3.获取封装的hooks函数:content暴露方法打开modal弹框模块
    const [
      pageModalRef,
      defaultInfo,
      searchInfo,
      handlerNewClick,
      handlerEditClick
    ] = userPageModal(newCallback, editCallback);

    // 4.获取处理后的响应式的modalConfig
    const modalConfigResult = computed(() => {
      // (1)角色下拉
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((role) => ({
        label: role.name,
        value: role.id
      }));
      // (2)部门下拉
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map(
        (department) => ({
          label: department.name,
          value: department.id
        })
      );
      return modalConfig;
    });
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigResult,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      searchInfo,
      pageModalRef,
      defaultInfo,
      handlerNewClick,
      handlerEditClick
    };
  }
});
</script>

<style scoped lang="less">
.user {
}
</style>
