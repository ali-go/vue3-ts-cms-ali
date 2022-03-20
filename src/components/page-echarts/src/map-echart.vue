<template>
  <div class="map-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from "@/base-ui/echart";
import { computed, defineProps } from "vue";
import { IDataType } from "../type";
import { convertData } from "../utils/convert-data";

const props = defineProps<{
  mapData: IDataType[];
}>();

console.log(props.mapData, "----------");

const options = computed(() => {
  return {
    backgroundColor: "#070827",
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return params.name + " : " + params.value[2];
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 60000,
      left: "10%",
      top: "bottom",
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ["rgba(0, 107, 255, 0.2)", "rgba(0, 107, 255, 0.8)"] // 蓝
      }
    },
    geo: {
      show: true,
      map: "china",
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: "#4499d0"
        }
      },
      roam: false,
      itemStyle: {
        areaColor: "rgba(0, 107, 255, 0.3)",
        borderColor: "#006BFF",
        borderWidth: 2
      }
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo",
        data: convertData(props.mapData),
        symbolSize: 12,
        symbolKeepAspect: true,
        itemStyle: {
          color: "#FFFFFF"
        },
        zlevel: 6
      },
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: false,
            color: "#fff"
          },
          itemStyle: {
            areaColor: "#2B91B7"
          }
        },
        roam: true,
        itemStyle: {
          areaColor: "#006BFF",
          borderColor: "#3B5077"
        },
        animation: false
      }
    ]
  };
});
</script>

<style lang="less" scoped></style>
