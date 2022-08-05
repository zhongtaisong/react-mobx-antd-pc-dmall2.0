import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 所有用户
     * @returns 
     */
    getUname = (): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.get("admin/select/role/uname").then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();