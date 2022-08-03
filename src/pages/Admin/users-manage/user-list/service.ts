import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 用户列表
     * @param params 
     * @returns 
     */
     selectUsersData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("users/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 添加 - 用户
     * @param params 
     * @returns 
     */
    addUsersData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("users/add", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 用户
     * @param params 
     * @returns 
     */
    updateUsersData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("users/update", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 用户
     * @param id 
     * @returns 
     */
    deleteUsersData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`users/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 重置用户密码
     * @param params 
     * @returns 
     */
     resetUpwdData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("users/resetUpwd", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();