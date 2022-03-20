<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="25%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <al-form v-bind="modalConfig" v-model="formData"></al-form>
      <!-- 预留插槽 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import AlForm, { IForm } from "@/base-ui/form";

import { useStore } from "@/store";

export default defineComponent({
  props: {
    // 标题
    title: {
      type: String,
      default: "编辑"
    },
    // al-form的配置信息
    modalConfig: {
      type: Object as PropType<IForm>,
      required: true
    },
    // 编辑新增传递的数据
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    // 其他参数数据(和上方defaultInfo合并)
    otherInfo: {
      type: Object,
      // default: () => ({})
      required: true
    },
    // 标识当前模块
    pageName: {
      type: String,
      required: true
    },
    // 当前的查询参数
    searchInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    AlForm
  },
  setup(props) {
    // 1.弹框显示隐藏
    const dialogVisible = ref(false);
    // 2.获取数据绑定的对象
    let formData = ref<any>({});
    // 3.获取formItems
    const formItems = props.modalConfig.formItems ?? [];
    // 4.监听并遍历获取字段初始化值
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of formItems) {
          formData.value[item.field] = newVal[item.field];
        }
      }
    );

    // 5.确定(编辑和新增)
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      // 根据defaultInfo判断是编辑还是新增
      console.log(Object.keys(props.defaultInfo), formData);

      if (!Object.keys(props.defaultInfo).length) {
        store.dispatch("system/addPageListAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
          queryInfo: props.searchInfo
        });
      } else {
        store.dispatch("system/editPageListAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
          queryInfo: props.searchInfo
        });
        console.log(props.searchInfo);
      }
    };
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style scoped></style>
