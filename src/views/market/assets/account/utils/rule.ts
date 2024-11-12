import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "广告主名称为必填项", trigger: "blur" }],
  project_id: [{ required: true, message: "推广项目必选", trigger: "blur" }],
  uid: [{ required: true, message: "广告主为必填项", trigger: "blur" }],
  account: [{ required: true, message: "广告主名称为必填项", trigger: "blur" }],
});

/** 自定义表单规则校验 */
export const uploadsFormRules = reactive(<FormRules>{
  project_id: [{ required: true, message: "推广项目必选", trigger: "blur" }],
  filepath: [{ required: true, message: "附件必选上传", trigger: "blur" }]
});
