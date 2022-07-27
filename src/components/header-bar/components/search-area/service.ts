import axios from '@axios';
import { message } from 'antd';
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
                message.error("操作失败！");
            });
        });
    }
}

export default new Service();