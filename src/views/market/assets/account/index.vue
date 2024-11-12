<script setup lang="ts">
import { useHook } from "./utils/hook";
import { ref } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";


import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";

defineOptions({
  name: "MarketAccount"
});

const formRef = ref();
const tableRef = ref();
const contentRef = ref();

const {
  form,
  loading,
  columns,
  rowStyle,
  dataList,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  downloadFile,
  openDialogUploads,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  channelList,
  projectList
} = useHook();


</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="广告主Id：">
        <el-input
          v-model="form.uid"
          placeholder="请输入广告主Id"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>

      <el-form-item label="广告主名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入广告主名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>

      <el-form-item label="推广渠道">
        <el-select
          v-model="form.channel_id"
          placeholder="请选择推广渠道"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="item in channelList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="推广项目">
        <el-select
          v-model="form.project_id"
          placeholder="请选择推广项目"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="item in projectList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon('ep:refresh')" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div ref="contentRef">
      <PureTableBar
        title="广告账号管理"
        :columns="columns"
        @refresh="onSearch"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增
          </el-button>
          <el-button
            type="primary"
            :icon="useRenderIcon(Upload)"
            @click="openDialogUploads()"
          >
            批量上传
          </el-button>
          <el-button
            type="primary"
            :icon="useRenderIcon(Download)"
            @click="downloadFile()"
          >
            模板文件
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :row-style="rowStyle"
            :adaptiveConfig="{ offsetBottom: 108 }"
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="pagination"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`是否确认删除名称为${row.name}的这条数据`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>

    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
