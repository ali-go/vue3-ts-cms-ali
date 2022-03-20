<template>
  <div class="login-phone">
    <el-form
      ref="formRef"
      :model="phoneForm"
      :rules="phoneRules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phoneForm.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vertify">
        <div class="vertify-box">
          <el-input v-model="phoneForm.vertify"></el-input>
          <el-button type="primary" class="vertify">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus"; //由于要使用form的ref，因此需要form的类型的实例作为ref的泛型
import { phoneRules } from "../config/phone-config";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    // 绑定数据
    const phoneForm = reactive({
      num: "",
      vertify: ""
    });
    const store = useStore();
    // 获取ref(如果给ref传null则下面获取value会报错，而且此处需要指定类型，使用typeof ElForm获取这个组件的类型，再使用ref的泛型中的方法InstanceType获取实例的类型)
    const formRef = ref<InstanceType<typeof ElForm>>();
    // 登录
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch("login/phoneLoginAction");
        }
      });
    };
    return {
      phoneForm,
      phoneRules,
      formRef,
      loginAction
    };
  }
});
</script>

<style scoped lang="less">
.login-phone {
  .vertify-box {
    display: flex;
    .vertify {
      margin-left: 15px;
    }
  }
}
</style>
