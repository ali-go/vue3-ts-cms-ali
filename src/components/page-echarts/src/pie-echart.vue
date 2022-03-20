<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
// 由于有多个不同类型的echart，所以基于base-echart再进行一层业务封装
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../type";
import { computed, defineProps } from "vue-demi";
// 获取props
const props = defineProps<{
  pieData: IDataType[];
}>();

// 通用的options,动态更新data
const options = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "top"
    },
    series: {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  };
});
</script>

<style lang="less" scoped></style>
