import * as echarts from "echarts";
import chinaMap from "../data/china.json";
// 注册地图
echarts.registerMap("china", chinaMap);
// 对echart的初始化，及方法封装成hooks
export default function (el: HTMLElement) {
  // 1.初始化实例
  const echartInstance = echarts.init(el);
  // 2.设置options
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };
  // 3.浏览器大小变化时更新图表大小
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });
  // 4.手动执行更新图表的方法(不是上方浏览器大小变化导致的，如左侧菜单栏收缩等，具体根据实际需求调用)
  const setResize = () => {
    echartInstance.resize();
  };

  // 使用对象暴露，方法按需导入，如果使用的是元组，则必须都导入
  return {
    echartInstance,
    setOptions,
    setResize
  };
}
