<template>
  <div class="al-form">
    <!-- 预留header插槽 -->
    <slot name="header"></slot>
    <el-form :label-width="labelWidth" class="form-content">
      <el-row>
        <!-- <template v-for="item in formItems" :key="item.label"> -->
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="styleItem"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
                <!-- <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                ></el-input> -->
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="op in item.options"
                    :key="op.title"
                    :value="op.value"
                    :label="op.label"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 预留footer插槽s -->
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
// import { defineComponent, PropType, ref, watch } from "vue";
import { defineComponent, PropType } from "vue";
import { IFormItem } from "../types";
export default defineComponent({
  props: {
    // 传递的双向绑定model字段(不能直接拿来绑定，违背vue原则，需要自己深拷贝处理)
    modelValue: {
      type: Object,
      required: true
    },
    // 渲染表单字段
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 表单标签宽度
    labelWidth: {
      type: String,
      default: "100px"
    },
    // 单个表单的样式
    styleItem: {
      type: Object,
      default: () => ({ padding: "0 10px" })
    },
    // 根据屏幕宽度划分col的占比
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //>=1920时
        lg: 8, //>=1200时
        md: 12, //>=992时
        sm: 24, //>=768时
        xs: 24 //<768时
      })
    }
  },
  name: "al-form",
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 方法一: 处理绑定值, 并监听改变;
    // 1.深拷贝
    // const formData = ref({ ...props.modelValue });
    // 2.数据监听
    // watch(
    //   formData,
    //   (newVal) => {
    //     console.log(newVal);

    //     emit("update:modelValue", newVal);
    //   },
    //   {
    //     deep: true
    //   }
    // );

    // 方法二：采用手动update-modelValue更新事件
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return {
      handleValueChange
      // formData
    };
  }
});
</script>

<style scoped lang="less">
.al-form {
  padding-top: 18px;
  padding-right: 10px;
  .form-content {
    padding: 5px 0;
  }
}
</style>
