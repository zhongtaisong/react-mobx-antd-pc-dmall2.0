import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 个人资料
     * @returns 
     */
    fetchSelectUserInfoData = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('users/select/uname').then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 个人资料
     * @param params 
     * @returns 
     */
    fetchUpdateUserInfoData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post('users/update', params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 登录密码
     * @param params 
     * @returns 
     */
    fetchUpdateUpwdData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post('users/update/upwd', params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }


}

export default new Service();
