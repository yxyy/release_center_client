import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils";
import {ResponseList} from "@/api/response"

export const getOperationLogsList = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/operation-log/list"),{ data });
}
