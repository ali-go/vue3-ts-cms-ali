<template>
  <div class="echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>
<script lang="ts" setup>
import useEchart from "../hooks/useEchart";
import { EChartsOption } from "echarts";
import {
  onMounted,
  ref,
  defineProps,
  withDefaults,
  watchEffect
} from "vue-demi";
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "360px"
  }
);
const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  // echart实例化
  const { setOptions } = useEchart(echartDivRef.value!);
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>
<style scoped lang="less"></style>
