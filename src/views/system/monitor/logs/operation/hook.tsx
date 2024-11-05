import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getKeyList } from "@pureadmin/utils";
import { getOperationLogsList } from "@/api/system/logs";
import { usePublicHooks } from "@/views/hooks";
import type { PaginationProps } from "@pureadmin/table";
import { type Ref, reactive, ref, onMounted, toRaw } from "vue";

export function useRole(tableRef: Ref) {
  const form = reactive({
    module: "",
    status: "",
    operatingTime: "",
    page: 1,
    limit: 10
  });
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const { tagStyle } = usePublicHooks();

  const logType = [
    '未知',
    '查询',
    '增加',
    '修改',
    '删除',
    '登录',
    '刷新',
  ]

  const buttonStatusIcon = [
    'primary',
    'success',
    'danger',
    'warning',
  ]

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "序号",
      prop: "id",
      minWidth: 90
    },
    {
      label: "日志Id",
      prop: "request_id",
      minWidth: 90
    },
    {
      label: "操作人员",
      prop: "user_id",
      minWidth: 100
    },
    {
      label: "所属模块",
      prop: "module",
      minWidth: 140
    },
    {
      label: "操作概要",
      prop: "log_type",
      minWidth: 140,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonStatusIcon[row.log_type]}
          effect="plain"
        >
          { logType[row.log_type] }
        </el-tag>
      )
    },
    {
      label: "操作 IP",
      prop: "ip",
      minWidth: 100
    },
    {
      label: "操作地点",
      prop: "address",
      minWidth: 140
    },
    {
      label: "操作系统",
      prop: "system",
      minWidth: 100
    },
    {
      label: "浏览器类型",
      prop: "user_agent",
      minWidth: 200
    },
    {
      label: "操作状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status === 200 ? 1 : 0 )}>
          {row.status === 200 ? "成功" : "失败"}
        </el-tag>
      )
    },
    {
      label: "请求参数",
      prop: "request",
      maxWidth: 150
    },
    {
      label: "请求响应",
      prop: "response",
      maxWidth: 200
    },
    {
      label: "操作时间",
      prop: "created_at",
      minWidth: 180,
      formatter: ({ operatingTime }) =>
        dayjs(operatingTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    form.limit = val
    onSearch()
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    form.page = val
    onSearch()
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(`已删除序号为 ${getKeyList(curSelected, "id")} 的数据`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  /** 清空日志 */
  function clearAll() {
    // 根据实际业务，调用接口删除所有日志数据
    message("已删除所有日志数据", {
      type: "success"
    });
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getOperationLogsList(tidyForm());
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const tidyForm = () => {
    let formData = toRaw(form)
    if (formData.status == ""){
      delete formData.status
    }

    return formData
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    selectedNum,
    onSearch,
    clearAll,
    resetForm,
    onbatchDel,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
