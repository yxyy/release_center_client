// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id:number
  name: string
  short_name: string
  channel_id: string
  project_id:number
  uid: number
  account: string
  password:string
  owner: number
  status: number
  oauth_type:number
  oauth_status:number
  oauth_subject:number
  lot:string
  remark: string;
}

interface UploadsFormItemProps {
  project_id:number
  filepath: string
}

interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps,UploadsFormItemProps };
