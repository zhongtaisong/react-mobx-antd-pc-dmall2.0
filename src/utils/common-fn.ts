import { cacheKey } from "@utils";

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = (): {
    /**
     * 是否拥有后台权限
     * 
     * 1是，0否
     */
    admin: string;
    /**
     * 用户头像
     */
    avatar: string;
    /**
     * 用户生日
     */
    birthday: string;
    /**
     * 用户邮箱
     */
    email: string;
    /**
     * 用户性别
     */
    gender: string;
    /**
     * 用户id
     */
    id: number;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 用户联系电话
     */
    phone: string;
    /**
     * 用户名
     */
    uname: string;
    /**
     * 登录凭证
     */
    token: string;
} => {
    let user_info;
    try {
        user_info = JSON.parse(sessionStorage.getItem(cacheKey.USER_INFO) || localStorage.getItem(cacheKey.USER_INFO));
    } catch (error) {
        console.log(error);
    }
    return user_info || {};
}

/**
 * 是否已登录
 */
export const isLogin = (): boolean => {
    return Boolean(window?.token || getUserInfo?.()?.token);
}
