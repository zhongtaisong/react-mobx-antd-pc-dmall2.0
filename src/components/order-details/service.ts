import axios from '@axios';
import { IResponse } from '@types';
// 订单详情
const detailOrdersUrl = '';

class Service {

    /**
     * 查询 - 订单详情
     * @param id 
     * @returns 
     */
    detailOrdersData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`order/detail/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    
}

export default new Service();