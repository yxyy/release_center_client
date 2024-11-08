<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import {usePackage} from "@/views/assets/package/utils/hook";
const {gameList,channelList} = usePackage()

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: '',
    app_id: '',
    game_id: '',
    channel_id: '',
    campaign_id: '',
    original_package_id: '',
    sdk_id: '',
    skin_id: '',
    package_name: '',
    status:'',
    last_package_time: '',
    cp_callback_url:    '',
    cp_callback_test_url: '',
    is_change_pay: '',
    is_sdk_float_on: '',
    is_user_float_on: '',
    is_reg_login_on: '',
    is_visitor_on: '',
    is_auto_login_on: '',
    is_log_on:'',
    is_shm:'',
    switch_login: '',
    online_time: '',
    scheme: '',
    privacy: '',
    offline: '',
    remarks: '',
    rate:    '',
    is_discard: '',
    id_card_verify:'',
    is_limit_minor: '',
    deny_reg: '',
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
    <el-form-item label="渠道包名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入游戏名称"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="渠道包名" prop="package_name">
      <el-input
        v-model="newFormInline.package_name"
        clearable
        placeholder="渠道包名，com.xiaozhu.name"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="推广游戏" prop="game_id">
      <el-select
        v-model="newFormInline.game_id"
        placeholder="请选择游戏"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in gameList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="接入sdk">
      <el-select
        v-model="newFormInline.sdk_id"
        placeholder="请选择接入sdk"
        clearable
        class="!w-[300px]"
      >
        <el-option label="小猪" value="1" />
      </el-select>
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

    <el-form-item label="包状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择包状态"
        clearable
        class="!w-[300px]"
      >
        <el-option label="正常" :value="0"/>
        <el-option label="下架" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="发货地址" prop="cp_callback_url">
      <el-input
        v-model="newFormInline.cp_callback_url"
        clearable
        placeholder="cp发货通知地址"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="测试发货地址" prop="cp_callback_test_url">
      <el-input
        v-model="newFormInline.cp_callback_test_url"
        clearable
        placeholder="cp测试发货通知地址"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="是否切支付">
      <el-select
        v-model="newFormInline.is_change_pay"
        placeholder="请选择是否切支付"
        clearable
        class="!w-[300px]"
      >
        <el-option label="是" :value="0"/>
        <el-option label="否" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="悬浮点">
      <el-select
        v-model="newFormInline.is_sdk_float_on"
        placeholder="请选择是否开启sdk的悬浮点"
        clearable
        class="!w-[300px]"
      >
        <el-option label="隐藏" :value="0"/>
        <el-option label="显示" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="预下载">
      <el-select
        v-model="newFormInline.is_reg_login_on"
        placeholder="请选择是否开启预下载"
        clearable
        class="!w-[300px]"
      >
        <el-option label="关闭" :value="0"/>
        <el-option label="正常" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="游客模式">
      <el-select
        v-model="newFormInline.is_visitor_on"
        placeholder="请选择是否开启游客模式"
        clearable
        class="!w-[300px]"
      >
        <el-option label="关闭" :value="0"/>
        <el-option label="正常" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="自动登录">
      <el-select
        v-model="newFormInline.is_auto_login_on"
        placeholder="请选择是否开启自动登录"
        clearable
        class="!w-[300px]"
      >
        <el-option label="关闭" :value="0"/>
        <el-option label="正常" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="日志上报">
      <el-select
        v-model="newFormInline.is_auto_login_on"
        placeholder="请选择是否开启错误日志上报"
        clearable
        class="!w-[300px]"
      >
        <el-option label="关闭" :value="0"/>
        <el-option label="正常" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="实名认证">
      <el-select
        v-model="newFormInline.id_card_verify"
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
        v-model="newFormInline.is_limit_minor"
        placeholder="请选择是否需要未成年限制"
        clearable
        class="!w-[300px]"
      >
        <el-option label="需要" :value="0"/>
        <el-option label="不需要" :value="1"/>
      </el-select>
    </el-form-item>

    <el-form-item label="转换倍数" prop="conversion">
      <el-input
        v-model="newFormInline.conversion"
        clearable
        placeholder="人民币和游戏币转换倍数，人民币是1"
        class="!w-[300px]"
      />
    </el-form-item>

    <el-form-item label="上线时间">
      <el-date-picker
        v-model="newFormInline.online_time"
        type="datetime"
        placeholder="选择上线时间"
        class="!w-[300px]">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="隐私协议" prop="privacy">
      <el-input
        v-model="newFormInline.privacy"
        clearable
        placeholder="隐私协议地址"
        class="!w-[500px]"
      />
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
        class="!w-[500px]"
      />
    </el-form-item>
  </el-form>
</template>
