import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 游戏管理列表 */
export const getChannelList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/channel/list"), {data});
};

/** 新增应用 */
export const createChannel = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/channel/create"), {data});
};

/** 更新应用 */
export const updateChannel = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/channel/update"), {data});
};

/** 获取所有应用 */
export const getAllChannelList = () => {
  return http.request<Result>("get", baseApiUrl("/assets/v1/channel/list-all"));
};


