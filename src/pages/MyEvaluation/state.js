import { observable, action, toJS } from "mobx";
import { message } from "antd";
// 接口服务
import service from './service';

class State {

    // 路由
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 商品
    @observable products = {};
    @action setProducts = (data = {}) => {
        this.products = data;
    }

    // 查询商品
    productsData = async (values = {}) => {
        const res = await service.productsData(values);
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setProducts(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价 - 发起请求
    addcommentsData = async (values = {}) => {
        const res = await service.addcommentsData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                this.history.goBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();