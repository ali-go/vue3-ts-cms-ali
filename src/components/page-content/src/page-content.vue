<template>
  <div class="page-content">
    <al-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :dataCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.header的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          :icon="CirclePlus"
          @click="newBtnClick"
        >
          新建
        </el-button>
        <el-button v-if="isQuery" type="primary" :icon="RefreshLeft">
          刷新
        </el-button>
      </template>
      <!-- 2.列表中公共的插槽(内容区需要处理部分字段的具名作用域插槽) -->
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.status == '1' ? 'success' : 'danger'"
          plain
          >{{ scope.row.status == "1" ? "上架" : "下架" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatUtcTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatUtcTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          type="text"
          :icon="Edit"
          @click="editBtnClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="text"
          :icon="Delete"
          @click="handleDeleteClick(scope.row)"
          >删除
        </el-button>
      </template>

      <!-- 3.列表中似有的插槽(每个模块特有的，此处再次埋插槽，在页面组件中插入) -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- 4.footer的插槽(默认有分页) -->
      <template #footer></template>
    </al-table>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import {
  defineComponent,
  computed,
  ref,
  watch,
  PropType,
  getCurrentInstance
} from "vue";
import AlTable, { ITable } from "@/base-ui/table";
import { userPermission } from "@/hooks/user-permission";
export default defineComponent({
  props: {
    // 表格的配置信息
    contentTableConfig: {
      type: Object as PropType<ITable>,
      required: true
    },
    // 使用该组件的当前页的标识(最好设计好，跟接口路径匹配，到时候好处理不同页面的接口)
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    AlTable
  },
  emits: ["handlerNewClick", "handlerEditClick"],
  setup(props, { emit }) {
    const store = useStore();
    const instance = getCurrentInstance();
    // 获取弹框变量
    const $confirm = instance?.appContext.config.globalProperties.$confirm;

    // 1.处理按钮权限
    const isCreate = userPermission("menu", "create"); //新建按钮
    const isDelete = userPermission("menu", "delete"); //删除按钮
    const isUpdate = userPermission("menu", "update"); //编辑按钮
    const isQuery = userPermission("menu", "query"); //更新按钮
    // console.log(isCreate, isDelete, isUpdate, isQuery);

    // 2.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    // 获取收集当前表单的查询条件
    let formList = {};
    // 获取收集全部的查询条件(包含页码)
    const searchInfo = ref({});
    // pageInfo变化时重新请求数据(al-table双向绑定了该数据并在切换页码条数时用新值替换了当前值)
    watch(pageInfo, () => getPageData());
    // 3.获取列表数据
    const getPageData = (formInfo: any = formList) => {
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...formInfo
        }
      });
      searchInfo.value = {
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize,
        ...formInfo
      };
      console.log(searchInfo.value);
    };
    getPageData();

    // 4.通过getter获取列表数据
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName)
    );

    // 5.处理插槽：过滤掉公共的插槽，获取页面独有的插槽字段(此处包含独有的和无标注slotName的)
    const otherPropSlots = props.contentTableConfig.propsList.filter((item) => {
      if (item.slotName === "createAt") return false;
      if (item.slotName === "updateAt") return false;
      if (item.slotName === "status") return false;
      if (item.slotName === "handler") return false;
      return true;
    });

    // 6.删除
    const handleDeleteClick = (row: any) => {
      $confirm("是否确认删除该数据？", "提示", {
        type: "warning",
        "cancel-button-text": "取消",
        "confirm-button-text": "确定",
        "close-on-click-modal": false
      })
        .then(() => {
          store.dispatch("system/deletePageListAction", {
            pageName: props.pageName,
            id: row.id,
            queryInfo: searchInfo
          });
        })
        .catch(() => {});
    };

    // 7.新建
    const newBtnClick = () => {
      emit("handlerNewClick", searchInfo.value);
    };

    // 7.新建
    const editBtnClick = (row: any) => {
      emit("handlerEditClick", row, searchInfo.value);
    };
    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      isQuery,
      handleDeleteClick,
      newBtnClick,
      editBtnClick,
      searchInfo
    };
  }
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
