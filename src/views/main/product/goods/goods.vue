<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchResetClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <!-- 页面特有的插槽 -->
      <!-- 1.图片 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <!-- 2.价格 -->
      <template #newPrice="scope">
        <span>{{ "￥" + scope.row.newPrice }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { userPageSearch } from "@/hooks/user-page-search";

import { searchFormConfig } from "./search.config";
import { contentTableConfig } from "./content-config";

export default defineComponent({
  name: "goods",
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
      handleResetClick,
      handleQueryClick,
      pageContentRef
    };
  }
});
</script>

<style scoped lang="less"></style>
