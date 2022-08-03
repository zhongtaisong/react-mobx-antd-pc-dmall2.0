import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import md5 from 'js-md5';
// 接口服务
import service from './service';
// 设置
import { PAGE_SIZE, PWD_KEY, INIT_PWD } from '@config';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 数据总数
    @observable total = PAGE_SIZE;
    @action setTotal = (data = PAGE_SIZE) => {
        this.total = data;
    }

    // 列表 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    /**
     * 查询用户 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 用户列表
     * @param params 
     */
    selectUsersDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selectUsersData(requestParams);

        if(res?.data?.code === 200){
            const { products, total } = res?.data?.data || {};

            this.setDataSource( products );
            this.setTotal( total );
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 添加 - 用户 - 操作
     * @param params 
     * @returns 
     */
    addUsersDataFn = async (params = {}) => {
        const res = await service.addUsersData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectUsersDataFn();
            return true;
        }
    }

    /**
     * 更新 - 用户
     * @param params 
     */
    updateUsersDataFn = async (params = {}) => {
        const res = await service.updateUsersData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectUsersDataFn();
            return true;
        }
    }

    /**
     * 删除 - 用户
     * @param id 
     * @returns 
     */
    deleteUsersDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteUsersData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectUsersDataFn();
        }
    }

    /**
     * 重置用户密码
     * @param params 
     * @returns 
     */
    resetUpwdDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.resetUpwdData({
            upwd: md5( INIT_PWD + PWD_KEY ),
            ...params,
        });
        if( res.data.code === 200 ){
            message.success(`重置用户密码成功，初始密码为：${ INIT_PWD }`);
        }
    }
}

export default new State();