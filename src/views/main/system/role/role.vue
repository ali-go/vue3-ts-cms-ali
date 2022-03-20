<template>
  <div class="role">
    <page-search
      @searchResetClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      :searchFormConfig="searchFormConfig"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="role"
      @handlerNewClick="handlerNewClick"
      @handlerEditClick="handlerEditClick"
      :contentTableConfig="contentTableConfig"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="role"
      :searchInfo="searchInfo"
      :otherInfo="otherInfo"
    >
      <div class="role-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          ref="roleTreeRef"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { ElTree } from "element-plus";

import { searchFormConfig } from "./search.config";
import { contentTableConfig } from "./content-config";
import { modalConfig } from "./modal.config";

import { userPageSearch } from "@/hooks/user-page-search";
import { userPageModal } from "@/hooks/user-page-modal";

import { computed, nextTick, onMounted, ref, watch } from "vue-demi";
import { useStore } from "@/store";

import { menuMapLeafkeys } from "@/utils/map-menus";

const [pageContentRef, handleResetClick, handleQueryClick] = userPageSearch();
const store = useStore();
const menus = computed(() => store.state.menuList);
const roleTreeRef = ref<InstanceType<typeof ElTree>>();
// 点击编辑的回调
const otherInfo = ref({}); //需要传递的勾选数据
// 获取勾选数据的公共处理方法
const commonFn = () => {
  const checkedKeys = computed(() => [...roleTreeRef!.value!.getCheckedKeys()]);
  const halfKeys = computed(() => [
    ...roleTreeRef!.value!.getHalfCheckedKeys()
  ]);
  const menuList = computed(() => [...checkedKeys.value, ...halfKeys.value]);
  otherInfo.value = { menuList: menuList };
};
const editCallback = (row: any) => {
  // 动态获取当前变化的权限菜单勾选key的数组(响应式)
  nextTick(() => {
    commonFn();
    // 获取角色原本的菜单权限数组
    const leafKeys = menuMapLeafkeys(row.menuList);
    roleTreeRef.value?.setCheckedKeys(leafKeys);
  });
};
// 新增的回调函数
const newCallback = () => {
  commonFn();
};
const [
  pageModalRef,
  defaultInfo,
  searchInfo,
  handlerNewClick,
  handlerEditClick
] = userPageModal(newCallback, editCallback);
</script>

<style scoped lang="less">
.role {
  .role-tree {
    padding-left: 20px;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
