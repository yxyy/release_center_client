import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils";
import {ResponseList} from "@/api/response"


export const getDeptList = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/dept/list"), {data});
}

export const createDept = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/dept/create"), {data});
}

export const updateDept = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/dept/update"), {data});
}

export const deleteDept = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/dept/delete"), {data});
}
