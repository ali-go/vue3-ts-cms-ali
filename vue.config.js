const path = require("path");
// const ElementPlus = require("unplugin-element-plus/webpack");
const AutoImport = require("unplugin-auto-import/webpack"); //element-plus按需导入
const Components = require("unplugin-vue-components/webpack"); //element-plus按需导入
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers"); //element-plus按需导入
module.exports = {
  // 几种修改配置的方式：
  // 第一种：使用cli特有的属性修改配置
  outputDir: "build",
  publicPath: "./",
  //此处我把publicPath设置为./，原因如下：
  // 1.如果我配置到服务器是默认的ip不接后缀的地址，那么publicPath可不写默认/，会自动索引到index.html的位置为绝对路径，并加载静态资源文件根据该路径索引；
  // 2.但是我此时是打包到服务器ip后面拼的地址，如果继续用绝对路径，那么浏览器输入ip/地址后，index.html可以就加载，但是引用的静态资源是绝对于ip的地址，
  // 少了后缀就无法nginx代理到指定的文件夹，即地址错误，故无法加载静态资源；
  // 3.此时有两种方式去解决，第一种是配置assetPublicPath:/地址/，即静态资源引用为ip拼上绝对地址，如此就可以正常的代理到ip/地址上，第二种是把publicPath直接
  // 改为./，即公共地址改为相对于index.html的当前目录，因此也能正常索引到与index.html同级的css和js文件夹中的静态资源；
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
