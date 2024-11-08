import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 开户主体管理列表 */
export const getPrincipalList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/principal/list"), { data });
};

/** 新增应用 */
export const createPrincipal = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/principal/create"), { data });
};

/** 更新应用 */
export const updatePrincipal = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/market/assets/principal/update"), { data });
};

/** 获取所有应用 */
export const getAllPrincipalList = () => {
  return http.request<Result>("get",  baseApiUrl("/market/assets/principal/list-all"));
};


