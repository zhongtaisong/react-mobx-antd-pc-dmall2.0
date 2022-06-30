import axios from '@axios';
// 退出登录
const logoutUrl = `users/logout`;

class Service {
    
    logoutData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(logoutUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();