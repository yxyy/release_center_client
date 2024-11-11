// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id:number

  name: string

  short_name: string

  channel_id: number

  proxy_company_id: number

  principal_id: number

  rebate: number

  contract_start_time:number

  contract_end_time: number

  contract_status:number

  /** 备注 */
  remark: string;

}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
