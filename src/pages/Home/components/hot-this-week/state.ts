import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 本周热门商品列表
    @observable productsList = [];
    @action setProductsList = (data = []) => {
        this.productsList = data;
    }

    // 查询本周热门商品
    productsListData = async () => {
        const res: any = await service.productsListData();
        try{
            if( res.data.code === 200 ){
                this.setProductsList(res?.data?.data || []);
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();