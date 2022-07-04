import axios from '@axios';
// 修改 - 个人资料
const updateUserInfoUrl = 'users/update';

class Service {

    updateUserInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateUserInfoUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();