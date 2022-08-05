import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 权限列表
     * @param params 
     * @returns 
     */
    selectData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("admin/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 添加 - 权限
     * @param params 
     * @returns 
     */
    addData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("admin/add", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 权限
     * @param params 
     * @returns 
     */
    updateData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("admin/update", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 权限
     * @param id 
     * @returns 
     */
    deleteData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`admin/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();