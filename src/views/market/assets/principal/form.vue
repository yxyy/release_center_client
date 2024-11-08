<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id:'',
    name: "",
    code: "",
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
    :inline="true"
  >
    <el-form-item label="主体名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入开户主体名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="主体标识" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入开户主体称"
        class="!w-[300px]"
      />
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
