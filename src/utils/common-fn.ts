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

/**
 * file图片数据转为base64
 * @param file 
 * @returns 
 */
export const fileToBase64 = (file) => {
    if(!file || !Object.keys(file).length) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 * 校验图片尺寸 - 操作
 * @param file 
 * @returns 
 */
export const checkSize = (file, width: Array<number>, height: Array<number>): Promise<string | boolean> => {
    if( !Array.isArray(width) || !width.length ) return Promise.resolve(false);
    if( !Array.isArray(height) || !height.length ) return Promise.resolve(false);

    return new Promise(resolve => {
        const _URL = window?.URL || window?.webkitURL;
        const img = new Image();
        img.src = _URL.createObjectURL(file?.originFileObj || file);
        img.onload = () => {
            if(!width.includes(img.width)){
                return resolve(`图片尺寸不对，宽度为${ width.join(' 或 ') }！`);
            }

            if(!height.includes(img.height)){
                return resolve(`图片尺寸不对，高度为${ height.join(' 或 ') }！`);
            }

            resolve(false);
        };
    });
}
