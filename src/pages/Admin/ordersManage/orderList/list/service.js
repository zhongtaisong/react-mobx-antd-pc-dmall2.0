import axios from '@axios';
// 查询列表
const selectOrdersUrl = 'order/select';
// 删除
const deleteOrdersUrl = 'order/delete';
// 查询所有用户
const selectUsersUrl = 'users/select';

class Service {
    selectOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectOrdersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteOrdersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    selectUsersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectUsersUrl, {
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