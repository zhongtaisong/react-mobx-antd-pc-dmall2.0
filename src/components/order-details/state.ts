import { observable, action } from "mobx";
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 收货人信息
    @observable consignees = {};
    @action setConsignees = (data = {}) => {
        this.consignees = data;
    }

    // 商品列表
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 付款信息
    @observable paymentInfo = {};
    @action setPaymentInfo = (data = {}) => {
        this.paymentInfo = data;
    }

    // 订单信息
    @observable orderInfo = {};
    @action setOrderInfo = (data = {}) => {
        this.orderInfo = data;
    }

    /**
     * 查询 - 订单详情 - 操作
     * @param obj 
     */
    detailOrdersDataFn = async (id) => {
        if(typeof id !== 'number') return;

        const res = await service.detailOrdersData(id);
        if(res?.data?.code === 200){
            const { address, orderInfo, productsInfo } = res?.data?.data || {};

            this.setConsignees(address);
            this.setOrderInfo(orderInfo);
            this.setDataSource02(productsInfo);
        }
    }

}

export default new State();