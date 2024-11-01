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


/** 获取系统管理-用户管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/role/list"), { data });
};

/** 获取系统管理-用户管理列表 */
export const createRole = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/role/create"), { data });
};

/** 获取系统管理-用户管理列表 */
export const updateRole = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/role/update"), { data });
};


/** 用户-分配菜单权限 */
export const saveRoleMenu = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/role/save-menu"), { data });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get",  baseApiUrl("/system/v1/role//list-all"));
};


