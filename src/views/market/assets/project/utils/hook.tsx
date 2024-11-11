import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import {  deviceDetection } from "@pureadmin/utils";
import {getList, create, update} from "@/api/market/assets/proxyProject";
import {getAllPrincipalList} from "@/api/market/assets/principal";
import {getAllProxyCompanyList} from "@/api/market/assets/proxyCompany";
import {getAllChannelList} from "@/api/assets/channel";
import { reactive, ref, onMounted, h, toRaw} from "vue";
import { contractStatus } from "@/utils/status";


export function useHook() {
  const form = reactive({
    name: "",
    code:'',
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  let channelList = ref([]);
  let principalList = ref([]);
  let proxyCompanyList = ref([]);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "Id",
      prop: "id"
    },
    {
      label: "名称",
      prop: "name"
    },
    {
      label: "简称",
      prop: "short_name"
    },
    {
      label: "媒体渠道",
      prop: "channel_name"
    },
    {
      label: "开户主体",
      prop: "principal_name"
    },
    {
      label: "代理公司",
      prop: "proxy_company_name"
    },
    {
      label: "返点基点",
      prop: "rebate",
      formatter:({rebate}) => rebate ? String(rebate * 100) + '%' : '0.00%'
    },
    {
      label: "合同开始时间",
      prop: "contract_start_time",
      minWidth: 160,
      formatter: ({ contract_start_time }) =>
        contract_start_time ? dayjs(contract_start_time * 1000).format("YYYY-MM-DD") : '-'
    },
    {
      label: "合同结束时间",
      prop: "contract_end_time",
      minWidth: 160,
      formatter: ({ contract_end_time }) =>
        contract_end_time ? dayjs(contract_end_time * 1000).format("YYYY-MM-DD") : '-'
    },
    {
      label: "合同进度",
      prop: "contract_status",
      formatter:({contract_status}) => contractStatus[contract_status]
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "操作人",
      prop: "opt_user"
    },
    {
      label: "添加时间",
      prop: "created_at",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}渠道`,
      props: {
        formInline: {
          id:row?.id ?? 0,
          name: row?.name ?? "",
          short_name: row?.short_name ?? "",
          channel_id: row?.channel_id ?? "",
          proxy_company_id: row?.proxy_company_id ?? "",
          principal_id: row?.principal_id ?? "",
          rebate: row?.rebate ?? "",
          contract_start_time: row?.contract_start_time ?? "",
          contract_end_time: row?.contract_end_time ?? "",
          contract_status: row?.contract_status ?? "",
          remark: row?.remark ?? "",
        }
      },
      width: "50%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = convertFormData(options.props.formInline);
        console.log(curData)
        function chores(data) {
          message(`您${title}了渠道名称为${curData.name}的这条数据`, {
            type: data.code == 20000 ? "success" : 'error'
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              create(curData).then(data => {
                chores(data)
              })

            } else {
              // 实际开发先调用修改接口，再进行下面操作
              update(curData).then(data=>{
                chores(data)
              })
            }
          }
        });
      }
    });
  }

  function convertFormData(data: any): FormItemProps {
    return {
      id: Number(data.id) || 0,
      name: data.name || '',
      short_name: data.short_name || '',
      channel_id: Number(data.channel_id) || 0,
      proxy_company_id: Number(data.proxy_company_id) || 0,
      principal_id: Number(data.principal_id) || 0,
      rebate: parseFloat(data.rebate) / 100 || 0,
      contract_start_time: Number(new Date(data.contract_start_time).getTime() / 1000) || 0,
      contract_end_time: Number(new Date(data.contract_end_time).getTime() / 1000) || 0,
      contract_status: Number(data.contract_status) || 0,
      remark: data.remark || ''
    };
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}


  onMounted(async () => {
    await onSearch();

    let { data:channelListAll } = await getAllChannelList()
    channelList.value = channelListAll

    let { data:principalListAll } = await getAllPrincipalList()
    principalList.value = principalListAll

    let { data: proxyCompanyListAll } =await  getAllProxyCompanyList()
    proxyCompanyList.value = proxyCompanyListAll

  });

  return {
    form,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    channelList,
    principalList,
    proxyCompanyList,
    contractStatus
  };
}
