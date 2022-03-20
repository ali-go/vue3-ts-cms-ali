<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <al-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </al-card>
      </el-col>
      <el-col :span="10">
        <al-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </al-card>
      </el-col>
      <el-col :span="7">
        <al-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </al-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <al-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </al-card>
      </el-col>
      <el-col :span="12">
        <al-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </al-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import AlCard from "@/base-ui/card";
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echarts";
import { useStore } from "@/store";
import { computed } from "vue-demi";
const store = useStore();
// 请求数据
store.dispatch("dashboard/getDashboardDataAction");
// 获取数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item) => {
    return { name: item.name, value: item.goodsCount };
  });
});
const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item) => {
    return { name: item.address, value: item.count };
  });
});

const categoryGoodsSale = computed(() => {
  const xLabel: string[] = [];
  const value: any[] = [];
  store.state.dashboard.categoryGoodsSale.map((item) => {
    xLabel.push(item.name);
    value.push(item.goodsCount);
  });

  return {
    xLabel,
    value
  };
});
const categoryGoodsFavor = computed(() => {
  const xLabel: string[] = [];
  const value: any[] = [];
  store.state.dashboard.categoryGoodsFavor.map((item) => {
    xLabel.push(item.name);
    value.push(item.goodsFavor);
  });

  return {
    xLabel,
    value
  };
});
</script>

<style scoped lang="less">
.dashboard {
  .content-row {
    margin-top: 20px;
  }
}
</style>
