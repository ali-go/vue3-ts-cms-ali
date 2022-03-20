<template>
  <div class="table">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header">
        <!-- 标题(如果不覆盖默认显示) -->
        <div class="title">{{ title }}</div>
        <div class="handle">
          <!-- 给按钮预览操作插槽 -->
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChnage"
      v-bind="childrenProps"
    >
      <!-- 多选列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        width="60"
        label="序号"
        align="center"
      ></el-table-column>
      <template v-for="item in propsList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align ?? 'center'"
          show-overflow-tooltip
        >
          <!-- 为了让不同字段可以自行处理对应的数据，此处使用table的自定义模块，再加具名作用域插槽 -->
          <!-- 1.当没有传递slotName时为默认插槽； -->
          <!-- 2.插槽设置默认输出,即原文本输出； -->
          <!-- 3.有传递具名插槽内容的，为了在外面拿到该数据，需用作用域插槽暴露scope.row数据 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部插槽(分页) -->
    <slot name="footer">
      <el-pagination
        class="table-pagination"
        :currentPage="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPropsTable } from "@/base-ui/table";
export default defineComponent({
  props: {
    // 总条数
    dataCount: {
      type: Number,
      default: 0
    },
    // 列表数据
    listData: {
      type: Object,
      required: true
    },
    // 表格字段
    propsList: {
      type: Array as PropType<IPropsTable[]>,
      required: true
    },
    // 表格标题
    title: {
      type: String,
      default: ""
    },
    // 是否显示序号
    showIndex: {
      type: Boolean,
      default: false
    },
    // 是否显示多选框
    showSelection: {
      type: Boolean,
      default: false
    },
    // 多层表嵌套
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 每页条数和页码
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ["handleSelectChnage", "update:page"],
  setup(props, { emit }) {
    // 表格多选框改变事件
    const handleSelectChnage = (selection: any) => {
      emit("handleSelectChnage", selection);
    };
    // 切换条数
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    // 切换页码
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    return {
      handleSelectChnage,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style scoped lang="less">
.table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .table-pagination {
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
