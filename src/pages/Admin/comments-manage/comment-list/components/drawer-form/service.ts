import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 用户名、商品编号
     * @returns 
     */
    getUnameAndPid = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("comment/select/getUnameAndPid").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();