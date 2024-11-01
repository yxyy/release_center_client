<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    app_name: "",
    status: "",
    company_id:"",
    game_class:"",
    remark: ""
  })
});

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
    label-width="82px"
  >
    <el-form-item label="应用名称" prop="app_name">
      <el-input
        v-model="newFormInline.app_name"
        clearable
        placeholder="请输入应用名称"
      />
    </el-form-item>

    <el-form-item label="应用类型">
      <el-input
        v-model="newFormInline.game_class"
        clearable
        placeholder="请输入应用类型"
      />
    </el-form-item>

    <el-form-item label="研发公司" prop="company_id">
      <el-input
        v-model="newFormInline.company_id"
        clearable
        placeholder="请输入研发公司"
      />
    </el-form-item>

    <el-form-item label="应用状态">
      <el-input
        v-model="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
