import { message } from 'antd';
import { observable, action, toJS } from 'mobx';
import md5 from 'js-md5';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';
// 设置
import { PWD_KEY } from '@config';

class State {

    // 上传头像 - 数据
    @observable fileListArr = [];
    @action setFileListArr = (data = []) => {
        this.fileListArr = data;
    }

    // 存储被删头像 - 数据
    @observable delList = [];
    @action setDelList = (data = []) => {
        this.delList = data;
    }

    // 标题
    @observable title = '添加用户';
    @action setTitle = (data = '添加用户') => {
        this.title = data;
    }

    // 查询所有用户 - 发起请求
    selectUsersData = async () => {
        const res = await service.selectUsersData({
            current: store.current,
            pageSize: store.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data || {};
                products.map((item, index) => {
                    return item['key'] = index + 1;
                });
                store.setDataList( products );
                store.setCurrent( current );
                store.setPageSize( pageSize );
                store.setTotal( total );
                // 清除抽屉内部数据
                store.clearMobxData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 添加用户 - 发起请求
    addUsersData = async (values = {}) => {
        const res = await service.addUsersData(values);
        try{
            const { data, code, msg } = res.data || {};
            if( code === 200 ){
                message.success( res.data.msg );
                this.selectUsersData();
            }else if( code === 201 ){
                message.error(msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除用户 - 发起请求
    deleteUsersData = async (id, avatar) => {
        const res = await service.deleteUsersData({
            id, avatar
        });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectUsersData();     
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改用户 - 发起请求
    updateUsersData = async (values) => {
        const res = await service.updateUsersData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectUsersData();         
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 重置用户密码 - 发起请求
    resetUpwdData = async (id, ukey) => {
        const randomUpwd = '123456';
        const res = await service.resetUpwdData({
            id,
            upwd: md5( randomUpwd + PWD_KEY ),
            ukey
        });
        try{
            if( res.data.code === 200 ){
                message.success(`重置用户密码成功，初始密码为：${randomUpwd}`);
                this.selectUsersData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setFileListArr();
        this.setDelList();
        this.setTitle();
    }

}

export default new State();