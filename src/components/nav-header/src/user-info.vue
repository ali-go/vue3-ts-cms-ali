<template>
  <div class="user-info">
    <user-msg />
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="loginOut"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item icon="Avatar">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Setting">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// import { useStore } from "vuex"; //由于vuex对ts的不够友好，此处直接用useStore的state不会提示state中的数据，因此此处不用默认的useStore
import { useStore } from "@/store";
import UserMsg from "./user-msg.vue";

import LocalCache from "@/utils/cache";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    UserMsg
  },
  setup() {
    const store = useStore();
    const name = computed(() => store.state.login.userInfo.name);
    const router = useRouter();
    // 退出
    const loginOut = () => {
      LocalCache.deleteCache("token");
      router.push("/main");
    };
    return {
      name,
      loginOut
    };
  }
});
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .name {
      margin-left: 10px;
    }
  }
}
</style>
