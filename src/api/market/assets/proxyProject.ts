import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 代理项目管理列表 */
export const getList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-project/list"), { data });
};

/** 新增 */
export const create = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-project/create"), { data });
};

/** 更新 */
export const update = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-project/update"), { data });
};

/** 获取所有 */
export const getAllList = () => {
  return http.request<Result>("get",  baseApiUrl("/market/assets/proxy-project/list-all"));
};


