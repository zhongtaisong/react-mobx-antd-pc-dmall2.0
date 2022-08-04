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
     * 查询商品评价 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 商品评价列表
     * @param params 
     */
    selectCommentDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selectCommentData(requestParams);

        if(res?.data?.code === 200){
            const { products, total } = res?.data?.data || {};

            this.setDataSource( products );
            this.setTotal( total );
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 添加 - 商品评价 - 操作
     * @param params 
     * @returns 
     */
    addCommentDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;
        
        const res = await service.addCommentData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectCommentDataFn();
            return true;
        }
    }

    /**
     * 更新 - 商品评价
     * @param params 
     */
    updateCommentDataFn = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.updateCommentData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectCommentDataFn();
            return true;
        }
    }

    /**
     * 删除 - 商品评价
     * @param id 
     * @returns 
     */
    deleteCommentDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteCommentData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selectCommentDataFn();
        }
    }

}

export default new State();