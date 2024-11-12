<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { useHook } from "./utils/hook";
import {openStatusMessage} from  "@/utils/status"

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id:'',
    name: "",
    remark: ""
  })
});

const {projectList,userList} =useHook()

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);


function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="100px"
    :inline="true"
  >
    <el-form-item label="广告主Id" prop="uid">
      <el-input
        v-model="newFormInline.uid"
        clearable
        placeholder="请输入广告主Id"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="广告主名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入广告主名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="广告主简称">
      <el-input
        v-model="newFormInline.short_name"
        clearable
        placeholder="请输入广告主简称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="推广项目">
      <el-select
        v-model="newFormInline.project_id"
        placeholder="请选择推广渠道"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in projectList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="账号状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择推广渠道"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="(item,key) in openStatusMessage"
          :label="item"
          :value="key"
          :key="key"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="使用人">
      <el-select
        v-model="newFormInline.owner"
        placeholder="请选择使用人"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in userList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
        class="!w-[300px]"
      />
    </el-form-item>
  </el-form>
</template>
