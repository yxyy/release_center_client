import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 游戏管理列表 */
export const getPackageList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/package/list"), { data });
};

/** 新增应用 */
export const createPackage = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/package/create"), { data });
};

/** 更新应用 */
export const updatePackage = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/package/update"), { data });
};

/** 更新应用状态 */
export const saveStatus = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/package/save-status"), { data });
};

/** 获取所有应用 */
export const getAllPackageList = () => {
  return http.request<Result>("get",  baseApiUrl("/assets/v1/package/list-all"));
};


