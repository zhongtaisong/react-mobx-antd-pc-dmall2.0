import { observable, action } from "mobx";
import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { PAGE_SIZE } from "@config";
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
     * 查询权限 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 订单列表
     * @param params 
     */
    selOrdersDataFn = async (params = {}) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const res = await service.selOrdersData(requestParams);

        if(res?.data?.code === 200){
            const { content, total } = res?.data?.data || {};

            this.setDataSource(content);
            this.setTotal(total);
            this.setRequestParams(requestParams);
        }
    }

    /**
     * 删除 - 订单
     * @param id 
     * @returns 
     */
    deleteOrderDataFn = async (id) => {
        if(!id || typeof id !== 'number') return;

        const res = await service.deleteOrderData(id);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selOrdersDataFn();
        }
    }

}

export default new State();