import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  game_name: [{ required: true, message: "应用名称为必填项", trigger: "blur" }],
  pkg_name: [{ required: true, message: "包名不能为空", trigger: "blur" }],
  os: [{ required: true, message: "系统类型必选", trigger: "blur" }],
  app_id: [{ required: true, message: "归属应用必选", trigger: "blur" }],
  cp_callback_url: [{ required: true, message: "发货地址不能为空", trigger: "blur" }],
});
