<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="accountForm"
      :rules="acconutRules"
      label-width="80px"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="accountForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus"; //由于要使用form的ref，因此需要form的类型的实例作为ref的泛型
import { acconutRules } from "../config/account-config";
import LocalCache from "@/utils/cache";
export default defineComponent({
  setup() {
    const store = useStore();
    // 绑定数据
    const accountForm = reactive({
      name: LocalCache.getCache("name") ?? "",
      password: LocalCache.getCache("password") ?? ""
    });
    // 获取ref(如果给ref传null则下面获取value会报错，而且此处需要指定类型，使用typeof ElForm获取这个组件的类型，再使用ref的泛型中的方法InstanceType获取实例的类型)
    const formRef = ref<InstanceType<typeof ElForm>>();
    // 登录
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否记住密码
          if (isKeepPassword) {
            LocalCache.setCache("name", accountForm.name);
            LocalCache.setCache("password", accountForm.password);
          } else {
            LocalCache.deleteCache("name");
            LocalCache.deleteCache("password");
          }
          // 2.开始登录认证
          store.dispatch("login/accountLoginAction", { ...accountForm });
        }
      });
    };

    return {
      accountForm,
      acconutRules,
      formRef,
      loginAction
    };
  }
});
</script>

<style scoped lang="less">
.login-account {
}
</style>
