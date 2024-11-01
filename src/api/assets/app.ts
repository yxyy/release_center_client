import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils"

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};


/** 应用管理列表 */
export const getAppList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/app/list"), { data });
};

/** 新增应用 */
export const createApp = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/app/create"), { data });
};

/** 更新应用 */
export const updateApp = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/app/update"), { data });
};

/** 更新应用状态 */
export const saveStatus = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/app/save-status"), { data });
};

/** 获取所有应用 */
export const getAllAppList = () => {
  return http.request<Result>("get",  baseApiUrl("/assets/v1/app//list-all"));
};


