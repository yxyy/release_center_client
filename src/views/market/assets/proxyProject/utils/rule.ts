import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "渠道名称为必填项", trigger: "blur" }],
  channel_id: [{ required: true, message: "渠道必选", trigger: "blur" }],
  principal_id: [{ required: true, message: "渠道必选", trigger: "blur" }],
  proxy_company_id: [{ required: true, message: "渠道必选", trigger: "blur" }],
});
