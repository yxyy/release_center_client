<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import {useGame} from "@/views/assets/game/utils/hook";
const {os,gameStatus,appInfo} = useGame()

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    app_name: "",
    status: "",
    app_id:"",
    os:"",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

console.log(os,newFormInline)

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
    <el-form-item label="游戏名称" prop="game_name">
      <el-input
        v-model="newFormInline.game_name"
        clearable
        placeholder="请输入游戏名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="游戏包名" prop="pkg_name">
      <el-input
        v-model="newFormInline.pkg_name"
        clearable
        placeholder="请输入游戏名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="系统类型" prop="os">
      <el-select
        v-model="newFormInline.os"
        placeholder="请选择系统类型"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in os"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="游戏状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择游戏状态"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="(item,index) in gameStatus"
          :label="item"
          :value="index"
          :key="index"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="归属应用" prop="app_id">
      <el-select
        v-model="newFormInline.app_id"
        placeholder="请选择归属应用"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in appInfo"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="实名认证">
      <el-select
        v-model="newFormInline.is_auth_real_name"
        placeholder="请选择是否需要实名认证"
        clearable
        class="!w-[300px]"
      >
        <el-option label="需要" :value="0"/>
        <el-option label="不需要" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="未成年限制">
      <el-select
        v-model="newFormInline.is_limit_underage"
        placeholder="请选择是否需要未成年限制"
        clearable
        class="!w-[300px]"
      >
        <el-option label="需要" :value="0"/>
        <el-option label="不需要" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="发货地址" prop="cp_callback_url">
      <el-input
        v-model="newFormInline.cp_callback_url"
        clearable
        placeholder="请输入正式发货地址"
        class="!w-[300px]"
      />
    </el-form-item>
    <el-form-item label="测试地址">
      <el-input
        v-model="newFormInline.cp_test_callback_url"
        clearable
        placeholder="请输入测试发货地址"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="转换倍数" prop="conversion">
      <el-input
        v-model="newFormInline.conversion"
        clearable
        placeholder="人民币和游戏币转换倍数，人民币是1"
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
