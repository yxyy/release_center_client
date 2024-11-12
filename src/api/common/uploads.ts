import { http } from "@/utils/http";
import {baseApiUrl,Result} from "@/api/utils"
import { downloadByUrl } from "@pureadmin/utils";

/** 上传文件 */
export const uploadsFile = (data?: object) => {
  return http.request<Result>("post", baseApiUrl("/common/uploads/"), { data },{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const downloadFileByUrl = async (filename: string) => {
  downloadByUrl(baseApiUrl("/storage/" + filename))
};



