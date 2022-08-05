import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 所有用户
     * @returns 
     */
    getUname = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("users/select/uname").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 查询 - 商品pid
     * @returns 
     */
    getPid = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("products/select/pid").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();