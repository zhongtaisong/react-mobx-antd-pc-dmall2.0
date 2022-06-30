import axios from '@axios';
// 查询列表
const selectCommentUrl = 'comment/select';
// 添加
const addCommentUrl = 'comment/add';
// 删除
const deleteCommentUrl = 'comment/delete';
// 修改
const updateCommentUrl = 'comment/update';

class Service {
    selectCommentData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectCommentUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addCommentData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addCommentUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteCommentData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(`${deleteCommentUrl}/${ req.id }`, ).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateCommentData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateCommentUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();