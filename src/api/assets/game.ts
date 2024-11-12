import { http } from "@/utils/http";
import {baseApiUrl,Result,ResultTable} from "@/api/utils"

/** 游戏管理列表 */
export const getGameList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/game/list"), {data});
};

/** 新增应用 */
export const createGame = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/game/create"), {data});
};

/** 更新应用 */
export const updateGame = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/game/update"), {data});
};

/** 更新应用状态 */
export const saveStatus = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/assets/v1/game/save-status"), {data});
};

/** 获取所有应用 */
export const getAllGameList = () => {
  return http.request<Result>("get", baseApiUrl("/assets/v1/game/list-all"));
};


