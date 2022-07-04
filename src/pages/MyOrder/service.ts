import axios from '@axios';
// 查询
const selOrdersUrl = 'order/select';
// 删除
const deleteOrderUrl = 'order/delete';

class Service {

    selOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selOrdersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteOrderData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteOrderUrl, {
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