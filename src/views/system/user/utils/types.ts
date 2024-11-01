interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  nickname: string;
  account: string;
  password: string;
  phone: string | number;
  email: string;
  sex: string | number;
  status: number;
  dept?: {
    id?: number;
    name?: string;
  };
  remark: string;
  roleIds: string;
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  account: string;
  nickname: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };
