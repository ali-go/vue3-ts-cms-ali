<template>
  <div class="nav-header">
    <el-icon :size="28" class="fold-menu" @click="handleClickFold">
      <fold v-if="!isFold" />
      <expand v-else />
    </el-icon>
    <div class="content">
      <al-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import UserInfo from "./user-info.vue";
import AlBreadcrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    UserInfo,
    AlBreadcrumb
  },
  emits: ["handleClickCollapse"],
  setup(props, { emit }) {
    // 点击收缩展开侧导航栏
    const isFold = ref(false);
    const handleClickFold = () => {
      isFold.value = !isFold.value;
      emit("handleClickCollapse");
    };
    // 获取面包屑的数组(父子菜单):为了响应式，因此用计算属性包裹
    const store = useStore();
    const userMenus = store.state.login.userMenus;
    const breadcrumbs = computed(() => {
      const route = useRoute();

      return pathMapBreadcrumbs(userMenus, route.path);
    });
    console.log(breadcrumbs.value);
    return {
      isFold,
      handleClickFold,
      breadcrumbs
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
