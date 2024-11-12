<script setup lang="ts">
import { ref} from "vue";
import { uploadsFormRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { useHook } from "./utils/hook";
import {uploadsFile} from  '@/api/common/uploads'
import {message} from "@/utils/message";

const {projectList} =useHook()



const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    project_id:'',
    filepath: ""
  })
});
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}
let fileList = ref([])
const handleRemove = (file, fileList) =>{
  console.log(file, fileList);
}
const handlePreview =(file) => {
  console.log(file);
}
const handleExceed =(files, fileList) => {
  this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
}
const  beforeRemove = (file, fileList) => {
  return this.$confirm(`确定移除 ${ file.name }？`);
}
const uploads = (params) => {
  let formData = new FormData()
  formData.append('file',params.file)
  uploadsFile(formData).then(data => {
    message(`批量上传广告主`, {
      type: data.code == 20000 ? "success" : 'error'
    });
    newFormInline.value.filepath= data.data
  })
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="uploadsFormRules"
    label-width="100px"
    :inline="true"
  >
    <el-form-item label="推广项目" prop="project_id">
      <el-select
        v-model="newFormInline.project_id"
        placeholder="请选择推广渠道"
        clearable
        class="!w-[300px]"
      >
        <el-option
          v-for="item in projectList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="附件" prop="filepath">
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :http-request="uploads"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>


  </el-form>
</template>
