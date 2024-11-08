import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "渠道包名称为必填项", trigger: "blur" }],
  package_name: [{ required: true, message: "渠道包名为必填项", trigger: "blur" }],
  game_id: [{ required: true, message: "游戏必选", trigger: "blur" }],
  channel_id: [{ required: true, message: "推广渠道必选", trigger: "blur" }]
});
