import axios from '@axios';
import { message } from 'antd';

const registerUrl = `users/reg`;

class Service {
    registerData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(registerUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                message.error("操作失败！");
            });
        });
    }
}

export default new Service();