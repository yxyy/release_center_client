import dayjs from "dayjs";
import editForm from "../form.vue";
import uploadsForm from "../uploadsForm.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps,UploadsFormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import {  deviceDetection } from "@pureadmin/utils";
import {getList, create, update,batchUploads} from "@/api/market/assets/account";
import { reactive, ref, onMounted, h, toRaw} from "vue";
import {getAllChannelList} from "@/api/assets/channel";
import {getAllList} from "@/api/market/assets/project";
import {getAllUserList} from "@/api/system/user";
import {openStatusMessage, buttonPackStatusIcon, buttonStatusIcon} from "@/utils/status"
import {windows} from "rimraf";
import {downloadFileByUrl} from  '@/api/common/uploads'


export function useHook() {
  const form = reactive({
    name: "",
  });
  const curRow = ref();
  const formRef = ref();
  const uploadsFormRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  let channelList = ref([]);
  let projectList = ref([]);
  let userList = ref([]);

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
      label: "推广渠道",
      prop: "channel_name"
    },
    {
      label: "推广项目",
      prop: "project_name"
    },
    {
      label: "账号状态",
      prop: "status",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonStatusIcon[row.status]}
          effect="plain"
        >
          {openStatusMessage[row.status]}
        </el-tag>
      )
    },
    {
      label: "使用人",
      prop: "owner_name"
    },
    {
      label: "备注",
      prop: "remark"
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
      title: `${title}广告主`,
      props: {
        formInline: {
          id:row?.id ?? 0,
          name: row?.name ?? "",
          short_name: row?.short_name ?? "",
          channel_id: row?.channel_id ?? "",
          project_id: row?.project_id ?? "",
          uid: row?.uid ?? "",
          account: row?.account ?? "",
          owner: row?.owner ?? "",
          status: row?.status ?? "",
          remark: row?.remark ?? "",
        }
      },
      width: "45%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData =  convertFormData(options.props.formInline);
        console.log(curData)
        function chores(data) {
          message(`您${title}了名称为${curData.name}的这条数据`, {
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

  function openDialogUploads(row?: UploadsFormItemProps) {
    addDialog({
      title: `批量上传广告主`,
      props: {
        formInline: {
          project_id: row?.project_id ?? "",
          filepath: row?.filepath ?? "",
        }
      },
      width: "45%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(uploadsForm, { ref: uploadsFormRef }),
      beforeSure: (done, { options }) => {
        const UploadsFormRef = uploadsFormRef.value.getRef();
        const curData =  options.props.formInline as UploadsFormItemProps;
        function chores(data) {
          message(`批量上传广告主`, {
            type: data.code == 20000 ? "success" : 'error'
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        UploadsFormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            batchUploads(curData).then(data=>{
              chores(data)
            })
          }
        });
      }
    });
  }

  function convertFormData(data: any) {
    return {
      id: Number(data.id) || 0,
      name: data.name || '',
      short_name: data.short_name || '',
      project_id: Number(data.project_id) || 0,
      status: Number(data.status) || 0,
      uid: Number(data.uid) || 0,
      account: data.account || '',
      owner: Number(data.owner) || 0,
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

  function downloadFile(){
    downloadFileByUrl('data/批量上传广告主模板.xlsx')
    // window.open("http://127.0.0.1:8888/storage/data/ad_account_uploads.xlsx")
  }

  onMounted(async () => {
    await onSearch();

    let { data:channelListAll } = await getAllChannelList()
    channelList.value = channelListAll

    let { data:projectListAll } = await getAllList()
    projectList.value = projectListAll

    let { data:userListAll } = await getAllUserList()
    userList.value = userListAll

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
    downloadFile,
    openDialog,
    openDialogUploads,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    channelList,
    projectList,
    userList
  };
}
