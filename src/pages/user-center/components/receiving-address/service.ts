import axios from '@axios';
import { IResponse } from '@types';

class Service {


    /**
     * 收货地址 - 添加/更新
     * @param params 
     * @returns 
     */
    editAddressData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("address/edit", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 收货地址 - 查询
     * @param params 
     * @returns 
     */
    selAddressData = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("address/select").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 收货地址 - 删除
     * @param params 
     * @returns 
     */
    delAddressData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("address/delete", {
                params
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();