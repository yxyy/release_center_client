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
        class="!w-[250px]"
      />
    </el-form-item>

    <el-form-item label="应用类型">
      <el-select
        v-model="newFormInline.game_class"
        placeholder="请选择研发公司"
        clearable
        class="!w-[250px]"
      >
        <el-option label="仙侠" value="1" />
        <el-option label="卡片" value="2" />
        <el-option label="竞技" value="3" />
      </el-select>
    </el-form-item>

    <el-form-item label="研发公司" prop="company_id">
      <el-select
        v-model="newFormInline.company_id"
        placeholder="请选择研发公司"
        clearable
        class="!w-[250px]"
      >
        <el-option label="6点半" value="1" />
        <el-option label="7点整" value="2" />
      </el-select>
    </el-form-item>

    <el-form-item label="应用状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择应用状态"
        clearable
        class="!w-[250px]"
      >
        <el-option label="推广中" value="1" />
        <el-option label="已下架" value="0" />
      </el-select>
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
