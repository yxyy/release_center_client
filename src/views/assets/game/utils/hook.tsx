import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import {  deviceDetection } from "@pureadmin/utils";
import {getGameList, createGame, updateGame} from "@/api/assets/game";
import { reactive, ref, onMounted, h, toRaw} from "vue";
import {getAllAppList} from "@/api/assets/app";

export function useGame() {
  const form = reactive({
    game_name: "",
    os:'',
    status: "",
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const gameStatus = [
    '对接中',
    '投放中',
    '下架了',
  ]
  const buttonStatusIcon = [
    'primary',
    'success',
    'danger',
    'warning',
  ]
  const os = {
    1:{id:1,name:'安卓'},
    2:{id:2,name:'苹果'},
    3:{id:3,name:'H5'},
    4:{id:4,name:'小程序'},
  }

  let appInfo = ref([]);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "游戏Id",
      prop: "id"
    },
    {
      label: "游戏名称",
      prop: "game_name"
    },
    {
      label: "系统类型",
      prop: "os",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonStatusIcon[row.os]}
          effect="plain"
        >
          { os[row.os].name }
        </el-tag>
      )
    },
    {
      label: "归属应用",
      prop: "app_name"
    },
    {
      label: "研发公司",
      prop: "company_name"
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonStatusIcon[row.status]}
          effect="plain"
        >
          { gameStatus[row.status] }
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "createTime",
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
    const { data } = await getGameList(tidyForm());
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
    if (formData.os == ""){
      delete formData.os
    }
    if (formData.app_id == ""){
      delete formData.app_id
    }

    return formData
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}游戏`,
      props: {
        formInline: {
          id:row?.id ?? 0,
          game_name: row?.game_name ?? "",
          pkg_name: row?.pkg_name ?? "",
          os: row?.os ?? "",
          status: row?.status ?? "",
          app_id: row?.app_id ?? "",
          cp_callback_url: row?.cp_callback_url ?? "",
          cp_test_callback_url: row?.cp_test_callback_url ?? "",
          conversion: row?.conversion ?? "",
          is_auth_real_name: row?.is_auth_real_name ?? "",
          is_limit_underage: row?.is_limit_underage ?? "",
          remark: row?.remark ?? "",
        }
      },
      width: "60%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = convertFormData(options.props.formInline as FormItemProps);
        console.log(curData)
        function chores(data) {
          message(`您${title}了游戏名称为${curData.game_name}的这条数据`, {
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
              createGame(curData).then(data => {
                chores(data)
              })

            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateGame(curData).then(data=>{
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
      game_name: data.game_name || '',
      pkg_name: data.pkg_name || '',
      os: Number(data.os) || 0,
      status: Number(data.status) || 0,
      app_id: Number(data.app_id) || 0,
      cp_callback_url: data.cp_callback_url || '',
      cp_test_callback_url: data.cp_test_callback_url || '',
      conversion: Number(data.conversion) || 0,
      is_auth_real_name: Number(data.is_auth_real_name) || 0,
      is_limit_underage: Number(data.is_limit_underage) || 0,
      remark: data.remark || '',
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

    const { data } = await getAllAppList()
    appInfo.value = data
  });

  return {
    os,
    form,
    curRow,
    appInfo,
    gameStatus,
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
    handleSelectionChange
  };
}
