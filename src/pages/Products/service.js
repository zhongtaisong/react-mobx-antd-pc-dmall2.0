import axios from '@axios';
// 查询全部商品
const productsUrl = 'products/select';
// 商品筛选条件
const filterUrl = 'products/select/filter';

class Service {

    productsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(productsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    filterData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(filterUrl, {
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