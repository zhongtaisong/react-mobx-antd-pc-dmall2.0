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
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    /**
     * 查询商品 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 商品列表
     * @param params 
     */
    selectProductsDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selectProductsData(requestParams);

        if(res?.data?.code === 200){
            const { products, total } = res?.data?.data || {};

            this.setDataSource( products );
            this.setTotal( total );
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 添加 - 商品 - 操作
     * @param params 
     * @returns 
     */
    addProductsDataFn = async (params = {}) => {
        const res = await service.addProductsData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectProductsDataFn();
            return true;
        }
    }

    /**
     * 更新 - 商品
     * @param params 
     */
    updateProductsDataFn = async (params = {}) => {
        const res = await service.updateProductsData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectProductsDataFn();
            return true;
        }
    }

    /**
     * 删除 - 商品
     * @param id 
     * @returns 
     */
    deleteProductsDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteProductsData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectProductsDataFn();
        }
    }

    /**
     * 操作商品
     * @param params 
     * @returns 
     */
    pushDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.pushData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectProductsDataFn();
        }
    }

}

export default new State();