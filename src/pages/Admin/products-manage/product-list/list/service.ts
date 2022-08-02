import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 商品列表
     * @param params 
     * @returns 
     */
    selectProductsData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("products/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 添加 - 商品
     * @param params 
     * @returns 
     */
    addProductsData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("products/add", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 商品
     * @param params 
     * @returns 
     */
    updateProductsData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("products/update", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 商品
     * @param id 
     * @returns 
     */
    deleteProductsData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`products/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 操作商品
     * @param params 
     * @returns 
     */
    pushData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("products/push", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();