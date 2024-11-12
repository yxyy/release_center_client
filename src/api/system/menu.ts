import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils";
import {ResponseList,MenuResponseList} from "@/api/response"


export const getMenuList = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/menu/list"), {data});
}

export const getRoleMenu = (data?: object) => {
  return http.request<MenuResponseList>("post", baseApiUrl("/system/v1/menu/list-all"), {data});
}

export const createMenu = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/menu/create"), {data});
}

export const updateMenu = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/menu/update"), {data});
}

export const deleteMenu = (data?: object) => {
  return http.request<ResponseList>("post", baseApiUrl("/system/v1/menu/delete"), {data});
}
