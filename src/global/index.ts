// 封装全局注册的文件(由于element-plus更新原因导致原来手动按需导入组件及使用babel-plugin-import会出错，因此采用官网的按需使用方式)
import { registerElement } from "./register-element";
import { registerElementIcon } from "./register-element-icon";
import { registerProperities } from "./register-properities";
import { App } from "vue";
export function registerApp(app: App): void {
  // 全局注册按需导入的element-plus
  // registerElement(app);
  registerElementIcon(app);
  registerProperities(app);
}
