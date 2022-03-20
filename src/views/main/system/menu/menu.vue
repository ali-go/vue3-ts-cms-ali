<template>
  <div class="menu">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchResetClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      ref="pageContentRef"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./search.config";
import { contentTableConfig } from "./content-config";

import { userPageSearch } from "@/hooks/user-page-search";

export default defineComponent({
  name: "al-menu",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 获取封装的hooks函数
    const [pageContentRef, handleResetClick, handleQueryClick] =
      userPageSearch();

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>

<style scoped lang="less"></style>
