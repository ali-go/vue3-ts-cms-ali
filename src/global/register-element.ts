import { App } from "vue";
// 按需导入注册element-plus组件(注意样式的按需导入使用插件babel-plugin-import，并在babel.config.js中配置，另base.css依旧需要在main.ts单独导入)
// 1、导入需要注册的元素
import { ElButton, ElInput } from "element-plus";
// 2、汇总到数组
const elements = [ElButton, ElInput];
// 3、遍历注册
export function registerElement(app: App): void {
  for (const el of elements) {
    app.component(el.name, el);
  }
}
