// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id:number
  name: string
  package_name: string
  // app_id: number
  game_id: number
  channel_id: number
  campaign_id: number
  original_package_id: number
  sdk_id: number
  skin_id: number

  status:number
  pack_status:number
  // last_package_time: number
  cp_callback_url:    string
  cp_callback_test_url: string
  is_change_pay: number
  is_sdk_float_on: number
  is_user_float_on: number
  is_reg_login_on: number
  is_visitor_on: number
  is_auto_login_on: number
  is_log_on:number
  is_shm:number
  switch_login: number
  online_time: number
  scheme: string
  privacy: string
  offline: number
  rate:    number
  is_discard: number
  id_card_verify:number
  is_limit_minor: number
  deny_reg: number

  remarks: string

}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
