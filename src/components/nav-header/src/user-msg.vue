<template>
  <div class="user-msg">
    <el-icon :size="15"><bell /></el-icon>
    <el-icon :size="15"><chat-dot-round /></el-icon>
    <el-icon :size="15"><postcard /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.user-msg {
  margin-right: 30px;
  display: flex;
  align-items: center;
  .el-icon {
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>
