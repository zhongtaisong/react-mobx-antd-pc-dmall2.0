import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { PAGE_SIZE } from '@config';
// 接口服务
import service from './service';

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
    @observable dataList = [];
    @action setDataList = (data = []) => {
        this.dataList = data;
    }

    /**
     * 查询品牌 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 品牌列表
     * @param params 
     */
    selectBrandDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selectBrandData(requestParams);

        if(res?.data?.code === 200){
            const { products, total } = res?.data?.data || {};

            this.setDataList( products );
            this.setTotal( total );
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 添加 - 品牌 - 操作
     * @param params 
     * @returns 
     */
    addBrandDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.addBrandData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectBrandDataFn();
            return true;
        }
    }

    /**
     * 更新 - 品牌
     * @param params 
     */
    updateBrandDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.updateBrandData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectBrandDataFn();
            return true;
        }
    }

    /**
     * 删除 - 品牌
     * @param id 
     * @returns 
     */
    deleteBrandDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteBrandData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectBrandDataFn();
        }
    }

}

export default new State();