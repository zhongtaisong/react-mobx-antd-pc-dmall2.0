import axios from '@axios';
// 单品推广 - 查询
const productsListUrl = 'index/onepush';

class Service {
    productsListData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productsListUrl, {
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