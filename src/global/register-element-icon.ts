// 注意：目前版本的element-plus要求使用icon时需要安装npm install @element-plus/icons-vue，并且需要手动导入注册图标组件，此处我选择全局全部注册
import { App } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
export function registerElementIcon(app: App): void {
  Object.values(ElIcons).forEach((item) => {
    // 1.全局注册图标组件：用于当做组件时使用
    app.component(item.name, item);
    // 2.全局挂载组件变量：用于某些组件的icon属性上动态绑定图标
    app.config.globalProperties[item.name] = item;
  });
}
