const path = require("path");
// const ElementPlus = require("unplugin-element-plus/webpack");
const AutoImport = require("unplugin-auto-import/webpack"); //element-plus按需导入
const Components = require("unplugin-vue-components/webpack"); //element-plus按需导入
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers"); //element-plus按需导入
module.exports = {
  // 几种修改配置的方式：
  // 第一种：使用cli特有的属性修改配置
  outputDir: "build",
  // publicPath: "./",
  // 第二种：使用configureWebpack对象包裹和webpack完全一致的属性配置，最后会使用webpack-merge进行合并的
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components"
      }
    },
    plugins: [
      // 按需导入element-plus组件的样式表
      require("unplugin-element-plus/webpack")({
        // 引入的样式的类型，可以是css、sass、less等，
        importStyle: "css",
        useSource: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // 第三种：使用configureWebpack函数形式，暴露原有配置参数，下面对配置重新覆盖操作
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/components"
  //   };
  // },
  // 第四种：使用chainWebpack函数来链式操作进行覆盖
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components");
  // }
};
