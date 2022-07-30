import { commonFn } from '@utils';
import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 收货地址 - 表格 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 模态框 - 数据
    @observable addressModalData = {};
    @action setAddressModalData = (data = {}) => {
        this.addressModalData = data;
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setAddressModalData();
    }

    /**
     * 收货地址 - 添加/更新 - 操作
     * @param params 
     */
    editAddressData = async (params = {}) => {
        const res = await service.editAddressData({...params});

        if(res?.data?.code === 200){
            message.success(res.data.msg);
            this.selAddressData();
        }
    }

    /**
     * 收货地址 - 查询 - 操作
     */
    selAddressData = async () => {
        const res = await service.selAddressData();

        if( res?.data?.code === 200 ){
            let { data } = res?.data || {};
            if(!Array.isArray(data)) {
                data = [];
            }

            data.forEach(item => {
                item.isDefault = Number(item.isDefault);
            })
            this.setDataSource(data);
        }
    }

    // 删除收货地址
    delAddressData = async (params = {}) => {
        if(!params || !Object.keys(params).length) return;

        const res = await service.delAddressData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
            this.selAddressData();
        }
    }
}

export default new State();