import axios from '@axios';
// 查询用户名
const getUname = 'comment/select/getUnameAndPid';

class Service {
    getUname = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(getUname, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();