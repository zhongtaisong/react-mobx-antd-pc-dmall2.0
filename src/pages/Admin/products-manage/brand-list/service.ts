import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 品牌列表
     * @param params 
     * @returns 
     */
    selectBrandData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("brand/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 添加 - 品牌
     * @param params 
     * @returns 
     */
    addBrandData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("brand/add", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 品牌
     * @param params 
     * @returns 
     */
    updateBrandData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("brand/update", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 品牌
     * @param id 
     * @returns 
     */
    deleteBrandData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`brand/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();