import axios from '@axios';
import { IResponse } from '@types';

class Service {

    /**
     * 查询 - 评价列表
     * @param params 
     * @returns 
     */
    selectCommentData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("comment/select", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 添加 - 评价
     * @param params 
     * @returns 
     */
    addCommentData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.post("comment/add", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 更新 - 评价
     * @param params 
     * @returns 
     */
    updateCommentData = (params = {}): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.put("comment/update", params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 删除 - 评价
     * @param id 
     * @returns 
     */
    deleteCommentData = (id: number): Promise<IResponse> => {
        return new Promise((resolve, reject) => {
            axios.delete(`comment/delete/${ id }`).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Service();