/* eslint-disable */
/* 由于某些原因使用了全局或者内置的一些变量时，ts检验可能会报错，不识别该变量，但确实实际上可以从内部拿到，
那么就可以在该文件声明该变量或者一些其他使用的东西存在，告知ts不要报错 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare let $store: any;
declare module "*.json";
