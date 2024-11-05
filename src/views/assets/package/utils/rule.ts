import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  app_name: [{ required: true, message: "应用名称为必填项", trigger: "blur" }],
  company_id: [{ required: true, message: "研发公司必选", trigger: "blur" }]
});
