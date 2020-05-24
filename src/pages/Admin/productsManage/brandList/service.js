import axios from '@axios';
// 查询列表
const selectBrandUrl = 'brand/select';
// 添加
const addBrandUrl = 'brand/add';
// 删除
const deleteBrandUrl = 'brand/delete';
// 修改
const updateBrandUrl = 'brand/update';

class Service {
    selectBrandData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectBrandUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addBrandData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addBrandUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteBrandData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteBrandUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateBrandData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateBrandUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();