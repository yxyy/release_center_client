import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "渠道名称为必填项", trigger: "blur" }],
  code: [{ required: true, message: "标识必选", trigger: "blur" }]
});
