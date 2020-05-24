import axios from '@axios';
// 查询列表
const selectProductsUrl = 'products/select';
// 添加
const addProductsUrl = 'products/add';
// 删除
const deleteProductsUrl = 'products/delete';
// 修改
const updateProductsUrl = 'products/update';
// 上架 / 下架 / 热门推广 / 单品推广 / banner推广
const pushUrl = 'products/push';

class Service {
    selectProductsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(selectProductsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    addProductsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addProductsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteProductsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteProductsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateProductsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateProductsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    pushData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(pushUrl, {
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