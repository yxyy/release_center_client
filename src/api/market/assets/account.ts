import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 广告账号管理列表 */
export const getList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/account/list"), {data});
};

/** 新增 */
export const create = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/account/create"), {data});
};

/** 更新 */
export const update = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/account/update"), {data});
};

/** 获取所有 */
export const getAllList = () => {
  return http.request<Result>("get", baseApiUrl("/market/assets/account/list-all"));
};

/** 批量上传 */
export const batchUploads = (curData: { project_id: number }) => {
  return http.request<Result>("post", baseApiUrl("/market/assets/account/uploads"));
};




