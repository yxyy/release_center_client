import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 开户主体管理列表 */
export const getProxyCompanyList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-company/list"), {data});
};

/** 新增应用 */
export const createProxyCompany = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-company/create"), {data});
};

/** 更新应用 */
export const updateProxyCompany = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/proxy-company/update"), {data});
};

/** 获取所有应用 */
export const getAllProxyCompanyList = () => {
  return http.request<Result>("get", baseApiUrl("/market/assets/proxy-company/list-all"));
};


