import axios from '@axios';
// 商品规格 - 查询
const selectProductsDetailUrl = 'details/select';

class Service {
    selectProductsDetailData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectProductsDetailUrl, {
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