import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseApiUrl("/system/v1/menu/list-tree"));
};
