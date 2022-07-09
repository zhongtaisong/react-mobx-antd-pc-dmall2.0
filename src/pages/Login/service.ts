import axios from '@axios';
import { message } from 'antd';

// 登录
const loginUrl = 'users/log';
// 忘记密码 - 信息验证
const forgetPwdUrl = 'users/vali/forgetPwd';
// 提交新密码
const newPwdUrl = 'users/update/upwd';

class Service {

    loginData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(loginUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                message.error("操作失败！");
            });
        });
    }

    forgetPwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(forgetPwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                message.error("操作失败！");
            });
        });
    }

    newPwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(newPwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                message.error("操作失败！");
            });
        });
    }
    
}

export default new Service();