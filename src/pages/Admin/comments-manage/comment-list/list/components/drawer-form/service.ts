import axios from '@axios';
// 查询用户名 和 商品编号
const getUnameAndPid = 'comment/select/getUnameAndPid';

class Service {
    getUnameAndPid = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(getUnameAndPid, {
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