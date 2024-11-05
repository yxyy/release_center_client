// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id:number
  /** 角色名称 */
  game_name: string

  pkg_name:string

  os: number

  status: number

  app_id: number

  cp_callback_url:string

  cp_test_callback_url:string

  conversion:number

  is_auth_real_name:number

  is_limit_underage:number

  /** 备注 */
  remark: string;

}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
