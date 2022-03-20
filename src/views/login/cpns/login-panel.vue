<template>
  <div class="login-panel">
    <h2>Vue3-TS 后台管理系统</h2>
    <el-tabs v-model="currentTab" type="border-card" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账户登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="save-password">
      <el-checkbox v-model="isKeepPassword" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const currentTab = ref("account");
    // 记住密码
    const isKeepPassword = ref(true);
    // 获取的ref
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    // 2.执行方法
    // 登录
    const handleLoginClick = () => {
      if (currentTab.value == "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        phoneRef.value?.loginAction();
      }
    };
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  width: 360px;
  margin-bottom: 100px;
  h2 {
    text-align: center;
  }
  .save-password {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
