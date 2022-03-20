<template>
  <div class="page-search">
    <al-form v-bind="searchFormConfig" v-model="formData">
      <!-- 设置插槽 -->
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh" @click="searchResetClick()"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="queryBtnClick"
            >查询</el-button
          >
        </div>
      </template>
    </al-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import AlForm from "@/base-ui/form";
import { IForm } from "@/base-ui/form/types";
export default defineComponent({
  components: {
    AlForm
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ["searchResetClick", "queryBtnClick"],
  setup(props, { emit }) {
    // formData的内字段名称应该根据searchFormConfig中formItem每项的field获取
    // 1.获取formItems
    const formItems = props.searchFormConfig.formItems ?? [];
    // 2.遍历获取字段
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    // 3.获取查询模块绑定的对象
    let formData = ref(formOriginData);

    // 重置
    const searchResetClick = () => {
      // 方法一：此处用遍历赋值，但是form使用双向绑定v-model并内部监听改变)：暂时无法理解
      // for (const key in formOriginData) {
      // formData.value[key] = formOriginData[key];
      // }
      // 方法二：此处直接赋值，但是form内部采用手动update-modelValue事件更新值
      formData.value = formOriginData;
      emit("searchResetClick", {});
    };
    // 查询
    const queryBtnClick = () => {
      emit("queryBtnClick", formData.value);
    };
    return {
      formData,
      searchResetClick,
      queryBtnClick
    };
  }
});
</script>

<style scoped lang="less">
.page-search {
  .header {
    color: red;
    margin: 10px 0;
  }
  .handle-btns {
    text-align: right;
    padding: 10px;
  }
}
</style>
