import { App } from "vue";
import { formatUtcString } from "@/utils/date-format";
import { ElMessageBox, ElMessage } from "element-plus";
// import "element-plus/theme-chalk/el-message-box.css";
// import "element-plus/theme-chalk/el-message.css";
// 注册全局变量
export function registerProperities(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log("这是全局变量的$filters的一个方法foo");
    },
    // 格式化utc格式的时间
    formatUtcTime(value: string, format?: string) {
      return formatUtcString(value, format);
    }
  };
  app.config.globalProperties.$confirm = ElMessageBox.confirm;
  app.config.globalProperties.$message = ElMessage;
}
