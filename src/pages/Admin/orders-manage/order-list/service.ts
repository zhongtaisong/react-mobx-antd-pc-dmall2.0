import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 订单列表
     * @param params 
     * @returns 
     */
    selectOrdersData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("order/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 订单
     * @param id 
     * @returns 
     */
    deleteOrdersData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`order/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();