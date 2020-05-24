import { observable, action, toJS } from "mobx";
import { message } from 'antd';
// 接口服务
import service from './service';
// 全局设置
import { searchAreaState } from '@config';

class State {

    // 购物车数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 选中数据key
    @observable selectedRowKeys = [];
    @action setSelectedRowKeys = (data = []) => {
        this.selectedRowKeys = data;
    }

    // 价格列表
    @observable priceList = [];
    @action setPriceList01 = (data = []) => {
        this.priceList = data;
    }
    @action setPriceList02 = (index, key, value) => {
        if( toJS( this.priceList ).length ){
            this.priceList[index][key] = value;
        }
    }

    // 数据总数
    @observable allProductsSize = 0;
    @action setAllProductsSize = (data = 0) => {
        this.allProductsSize = data;
    }

    // 获取购物车列表数据 - 发起请求
    cartLisData = async () => {
        if( !sessionStorage.getItem('uname') ){
            return;
        };

        const res = await service.cartLisData({
            uname: sessionStorage.getItem('uname'),
            collection: 0
        });

        try{
            if( res.data.code === 200 ){
                if( res.data.data ){
                    this.setDataSource( res.data.data );
                    let sum = 0;
                    res.data.data.forEach(item => {
                        sum += item.num;
                    });
                    this.setAllProductsSize( sum );
                }
                searchAreaState.productNumData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除购物车指定id数据
    delcartData = async (ids = []) => {
        const res = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入收藏
    addcolsData = async (cartId = []) => {
        const res = await service.addcolsData({ 
            uname: sessionStorage.getItem('uname'), 
            ids: cartId,
            collection: 1
        });
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更新购物车数据
    updatecartData = async (id, num, totalprice) => {
        const res = await service.updatecartData({ 
            uname: sessionStorage.getItem('uname'), 
            id, num, totalprice
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();