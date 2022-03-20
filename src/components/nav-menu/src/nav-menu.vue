<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
      :default-active="defaultActive"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <component :is="changeIcon(item.icon)"></component>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
        <template v-else-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="changeIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon v-if="subitem.icon">
                  <component :is="changeIcon(item.icon)"></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 获取数据
    const store = useStore();
    const router = useRouter();
    const userMenus = computed(() => store.state.login.userMenus);
    // 获取当前路由的id用作menu的index
    //(此处如果路由地址为/main则无法匹配到值，即从undefined取id会报错，因此需要指定/main时重定向到第一个子菜单，进而需要在处理权限菜单时拿到权限范围内的第一个子菜单)
    const route = useRoute();
    const menu = pathMapToMenu(userMenus.value, route.path);
    const defaultActive = ref(menu.id + "");
    // 处理后台返回的类似el-icon-edit等图标的标识(提取最后一个字符串并利用内置组件component转换图标组件)
    const changeIcon = (data: string) => {
      const iconString = data.slice(8);
      return iconString;
    };
    // 点击菜单
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found"
      });
    };
    return {
      userMenus,
      defaultActive,
      changeIcon,
      handleMenuItemClick
    };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 10px 8px 10px;
    height: 28px;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      color: #fff;
      font-size: 700;
    }
  }
  .el-menu-vertical {
    border-right: 0;
    .el-sub-menu {
      // background-color: #001529;
    }
    // 设置高亮
    .el-menu-item:hover {
      color: #fff;
    }
    .el-menu-item {
      padding-left: 15px;
      &.is-active {
        color: #fff;
        background-color: #0a60bd;
      }
    }
  }
}
</style>
