import axios from '@axios';
// 本周热门商品 - 查询
const productsListUrl = 'index/hot';

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