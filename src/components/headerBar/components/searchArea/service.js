import axios from '@axios';
// 购物车商品数量
const productNumUrl = 'cart/select/num';
// 关键字搜索
const kwUrl = 'index/kw';

class Service {
    productNumData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productNumUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    kwData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(kwUrl, {
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