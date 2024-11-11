<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";


import { useHook } from "./utils/hook";

const { channelList,principalList,proxyCompanyList,contractStatus } = useHook()

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
    label-width="100px"
    :inline="true"
  >
    <el-form-item label="项目名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入渠道名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="项目简称">
      <el-input
        v-model="newFormInline.short_name"
        clearable
        placeholder="请输入渠道名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="推广渠道" prop="channel_id">
      <el-select
        v-model="newFormInline.channel_id"
        placeholder="请选择推广渠道"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in channelList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="开户主体" prop="principal_id">
      <el-select
        v-model="newFormInline.principal_id"
        placeholder="请选择开户主体"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in principalList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="代理商" prop="proxy_company_id">
      <el-select
        v-model="newFormInline.proxy_company_id"
        placeholder="请选择代理商"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in proxyCompanyList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="基点返点">
      <el-input
        v-model="newFormInline.rebate"
        clearable
        placeholder="请输入基点返点,百分比，如： 5.12%"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="合同开始时间">
      <el-date-picker
        v-model="newFormInline.contract_start_time"
        type="date"
        placeholder="选择日期"
        class="!w-[300px]"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="合同结束时间">
      <el-date-picker
        v-model="newFormInline.contract_end_time"
        type="date"
        placeholder="选择日期"
        class="!w-[300px]"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="合同状态">
      <el-select
        v-model="newFormInline.proxy_company_id"
        placeholder="请选择代理商"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="(item,key) in contractStatus"
          :label="item"
          :value="key"
          :key="key"
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
