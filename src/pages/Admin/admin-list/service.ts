import axios from '@axios';
// 查询列表
const selectUrl = 'admin/select';
// 添加 / 修改
const editUrl = 'admin/edit';
// 删除
const deleteUrl = 'admin/delete';

class Service {

    selectData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    editData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(editUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteUrl, {
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