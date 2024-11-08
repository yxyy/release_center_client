import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import {  deviceDetection } from "@pureadmin/utils";
import {getPackageList, createPackage, updatePackage} from "@/api/assets/package";
import { reactive, ref, onMounted, h, toRaw} from "vue";
import {getAllGameList} from "@/api/assets/game";
import {getAllChannelList} from "@/api/assets/channel";
import {buttonStatusIcon, packStatusMessage, buttonPackStatusIcon} from "@/utils/status";

export function usePackage() {
  const form = reactive({
    name: "",
    game_id: "",
    channel_id: "",
    status: "",
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  let gameList = ref([]);
  let channelList = ref([]);

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
      label: "游戏",
      prop: "game_name"
    },
    {
      label: "应用",
      prop: "app_name"
    },
    {
      label: "自然量广告",
      prop: "campaign_id"
    },
    {
      label: "SDK",
      prop: "sdk_id"
    },
    {
      label: "推广渠道",
      prop: "channel_name"
    },
    {
      label: "包状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonStatusIcon[row.status]}
          effect="plain"
        >
          { row.status == 1 ? '下架' : '正常' }
        </el-tag>
      )
    },
    {
      label: "打包状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={buttonPackStatusIcon[row.pack_status]}
          effect="plain"
        >
          { row.os == 1 ? packStatusMessage[row.pack_status] : '无需打包' }
        </el-tag>
      )
    },
    {
      label: "打包时间",
      prop: "last_package_time",
      minWidth: 160,
      formatter: ({ last_package_time }) =>
        last_package_time ? dayjs(last_package_time).format("YYYY-MM-DD HH:mm:ss") : '-'
    },
    {
      label: "更新时间",
      prop: "updated_at",
      minWidth: 160,
      formatter: ({ updated_at }) =>
        dayjs(updated_at * 1000).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "备注",
      prop: "remark"
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
    const { data } = await getPackageList(tidyForm());
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
    if (formData.game_id == ""){
      delete formData.game_id
    }
    if (formData.channel_id == ""){
      delete formData.channel_id
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
      title: `${title}渠道包`,
      props: {
        formInline: {
          id:row?.id ?? 0,
          name: row?.name ?? "",
          package_name: row?.package_name ?? "",
          game_id: row?.game_id ?? "",
          channel_id: row?.channel_id ?? "",
          campaign_id: row?.campaign_id ?? "",
          original_package_id: row?.original_package_id ?? "",
          sdk_id: row?.sdk_id ?? "",
          skin_id: row?.skin_id ?? "",
          status: row?.status ?? "",
          // last_package_time: row?.last_package_time ?? "",
          cp_callback_url: row?.cp_callback_url ?? "",
          cp_callback_test_url: row?.cp_callback_test_url ?? "",
          is_change_pay: row?.is_change_pay ?? "",
          is_sdk_float_on: row?.is_sdk_float_on ?? "",
          is_user_float_on: row?.is_user_float_on ?? "",
          is_reg_login_on: row?.is_reg_login_on ?? "",
          is_visitor_on: row?.is_visitor_on ?? "",
          is_auto_login_on: row?.is_auto_login_on ?? "",
          is_shm: row?.is_shm ?? "",
          switch_login: row?.switch_login ?? "",
          online_time: row?.online_time ?? "",
          scheme: row?.scheme ?? "",
          privacy: row?.privacy ?? "",
          offline: row?.offline ?? "",
          rate: row?.rate ?? "",
          is_discard: row?.is_discard ?? "",
          id_card_verify: row?.id_card_verify ?? "",
          is_limit_minor: row?.is_limit_minor ?? "",
          deny_reg: row?.deny_reg ?? "",
          remarks: row?.remarks ?? "",
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
          message(`您${title}了渠道包名称为${curData.name}的这条数据`, {
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
              createPackage(curData).then(data => {
                chores(data)
              })

            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updatePackage(curData).then(data=>{
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
      package_name: data.package_name || '',
      game_id: Number(data.game_id) || 0,
      channel_id: Number(data.channel_id) || 0,
      campaign_id: Number(data.campaign_id) || 0,
      original_package_id: Number(data.original_package_id) || 0,
      sdk_id: Number(data.sdk_id) || 0,
      skin_id: Number(data.skin_id) || 0,
      status: Number(data.status) || 0,
      pack_status: Number(data.pack_status) || 0,
      // app_id: Number(data.app_id) || 0,
      cp_callback_url: data.cp_callback_url || '',
      cp_callback_test_url: data.cp_callback_test_url || '',
      // last_package_time: data.remarks || '',
      is_change_pay: Number(data.is_change_pay) || 0,
      is_sdk_float_on: Number(data.is_sdk_float_on) || 0,
      is_user_float_on: Number(data.is_user_float_on) || 0,
      is_reg_login_on: Number(data.is_reg_login_on) || 0,
      is_visitor_on: Number(data.is_visitor_on) || 0,
      is_auto_login_on: Number(data.is_auto_login_on) || 0,
      is_log_on: Number(data.is_log_on) || 0,
      is_shm: Number(data.is_shm) || 0,
      switch_login: Number(data.switch_login) || 0,
      online_time: data.online_time ? (new Date(data.online_time)).getTime() : 0,
      scheme: data.scheme || '',
      privacy: data.privacy || '',
      offline: Number(data.offline) || 0,
      rate: Number(data.rate) || 0,
      is_discard: Number(data.is_discard) || 0,
      id_card_verify: Number(data.id_card_verify) || 0,
      is_limit_minor: Number(data.is_limit_minor) || 0,
      deny_reg: Number(data.deny_reg) || 0,

      remarks: data.remarks || ''
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

    let { data:gameListAll } = await getAllGameList()
    gameList.value = gameListAll

    let { data:channelListAll } = await getAllChannelList()
    channelList.value = channelListAll

  });

  return {
    form,
    curRow,
    gameList,
    channelList,
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
