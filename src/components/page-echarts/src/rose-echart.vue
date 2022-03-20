<template>
  <div class="rose-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { IDataType } from "@/components/page-echarts/type";
import BaseEchart from "@/base-ui/echart";

const props = defineProps<{
  roseData: IDataType[];
}>();

const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "分类商品数量",
        type: "pie",
        radius: [10, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  };
});
</script>

<style lang="less" scoped></style>
