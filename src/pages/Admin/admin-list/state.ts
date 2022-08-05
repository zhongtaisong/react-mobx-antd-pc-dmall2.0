import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { PAGE_SIZE } from '@config';
// 接口服务
import service from './service';
import { OPERATION_BTN } from './data';

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
     * 查询权限 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 权限列表
     * @param params 
     */
    selectDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selectData(requestParams);

        if(res?.data?.code === 200){
            let { data, total } = res?.data?.data || {};
            if(Array.isArray(data)) {
                data.forEach(item => {
                    Object.entries(item).forEach(([key, value]: Array<any>) => {
                        if(key.includes("Menu")) {
                            item[key] = { 0: "关", 1: "开", }[value];
                        }

                        if(key.includes("Btn") && Array.isArray(value)) {
                            item[key] = value.reduce((str, val, index, arr) => {
                                str += `${ OPERATION_BTN?.[val] }${ index < arr.length - 1 ? "、" : "" }`;
                                return str;
                            }, "");
                        }
                    });
                })
            }

            this.setDataSource(data);
            this.setTotal(total);
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 添加 - 权限 - 操作
     * @param params 
     * @returns 
     */
    addDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;
        
        const res = await service.addData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectDataFn();
            return true;
        }
    }

    /**
     * 更新 - 权限
     * @param params 
     */
    updateDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.updateData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectDataFn();
            return true;
        }
    }

    /**
     * 删除 - 权限
     * @param id 
     * @returns 
     */
    deleteDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectDataFn();
        }
    }

}

export default new State();