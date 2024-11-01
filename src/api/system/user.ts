import { http } from "@/utils/http";
import {baseApiUrl} from "@/api/utils"

export type UserResult = {
  code: number;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    access_token: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refresh_token: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    access_expire: number;

    refresh_expire: number;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    access_token: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refresh_token: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    access_expire: number;

    refresh_expire: number;
  };
};

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

export type UserInfoResult = {
  success: boolean;
  data: UserInfo;
};

type ResultTable = {
  code: number
  message:string
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  }
  request_id:string
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseApiUrl("/system/v1/auth/login"), { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseApiUrl("/system/v1/auth/refresh"), { data });
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/user/list"), { data });
};

/** 获取系统管理-用户管理列表 */
export const createUser = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/user/create"), { data });
};

/** 获取系统管理-用户管理列表 */
export const updateUser = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/user/update"), { data });
};

/** 用户-分配角色 */
export const saveUserRole = (data?: object) => {
  return http.request<ResultTable>("post", baseApiUrl("/system/v1/user/save-role"), { data });
};

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return http.request<UserInfoResult>("get", "/mine", { data });
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return http.request<ResultTable>("get", "/mine-logs", { data });
};
