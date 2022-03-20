<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-aside">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @handleClickCollapse="handleClickCollapse" />
        </el-header>
        <el-main class="page-content">
          <div class="page-main">
            <el-config-provider :locale="zhCn">
              <router-view v-slot="{ Component }">
                <transition name="slide-fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </el-config-provider>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import NavHeader from "@/components/nav-header";
import NavMenu from "@/components/nav-menu";
// 国际化导入中文
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import { useStore } from "@/store";
export default defineComponent({
  components: {
    NavHeader,
    NavMenu,
    ElConfigProvider
  },
  setup() {
    const store = useStore();
    const isCollapse = ref(false);
    // 收缩展开侧导航栏
    const handleClickCollapse = () => {
      isCollapse.value = !isCollapse.value;
      console.log(isCollapse.value);
    };
    // 给vuex全局存储实例对象
    store.commit("getCurrentInstance", getCurrentInstance());
    return {
      isCollapse,
      handleClickCollapse,
      zhCn
    };
  }
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .main-aside {
      overflow-y: auto;
      overflow-x: hidden;
      text-align: left;
      // transition: width 0.3s linear;
      scrollbar-width: none; /*firefox*/
      -ms-overflow-style: none; /*ie*/
      /*chrome*/
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .page {
      .page-header {
        // padding: 0;
        height: 48px;
        display: flex;
        text-align: center;
        color: #333;
        align-items: center;
      }
      .page-content {
        color: #333;
        text-align: center;
        background-color: #f0f2f5;
        .page-main {
          background-color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
  .slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
  }
}
</style>
