// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id:number
  /** 角色名称 */
  app_name: string
  /** 角色编号 */
  status: number

  game_class: number

  company_id: number

  /** 备注 */
  remark: string;

}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
