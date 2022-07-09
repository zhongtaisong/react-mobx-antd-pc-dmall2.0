import axios from '@axios';
import { message } from 'antd';
// 退出登录
const logoutUrl = `users/logout`;

class Service {
    
    logoutData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(logoutUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                message.error("操作失败！");
            });
        })
    }
}

export default new Service();