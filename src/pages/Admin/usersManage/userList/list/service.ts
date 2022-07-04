import axios from '@axios';
// 查询列表
const selectUsersUrl = 'users/select';
// 添加
const addUsersUrl = 'users/add';
// 删除
const deleteUsersUrl = 'users/delete';
// 修改
const updateUsersUrl = 'users/update';
// 重置用户密码
const resetUpwdUrl = 'users/resetUpwd';

class Service {

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

    addUsersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addUsersUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteUsersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteUsersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateUsersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateUsersUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    resetUpwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(resetUpwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();