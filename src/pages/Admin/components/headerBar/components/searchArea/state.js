import { observable, action, toJS } from "mobx";
import { message } from 'antd';
// 接口服务
import service from './service';

class State {

    // 是否展示搜索结果页面
    @observable isShowResultPage = false;
    @action setIsShowResultPage = (data = false) => {
        this.isShowResultPage = data;
    }

    // 商品数量
    @observable productNum = 0;
    @action setProductNum = (data = 0) => {
        this.productNum = data;
    }

    // 获取购物车列表数据 - 发起请求
    productNumData = async () => {
        let uname;
        if( sessionStorage.getItem('uname') ){
            uname = sessionStorage.getItem('uname');
        }else{
            if( localStorage.getItem('uname') ){
                uname = localStorage.getItem('uname');
            }else{
                return;
            }
        }
        const res = await service.productNumData({
            uname,
            isCount: true
        });
        try{
            if( res.data.code === 200 ){
                this.setProductNum( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 是否展示搜索框
    @observable isShowSearchInput = false;
    @action setIsShowSearchInput = (data = false) => {
        this.isShowSearchInput = data;
    }
    @action setIsShowSearchInput02 = () => {
        this.isShowSearchInput = !toJS( this.isShowSearchInput );
    }

    // 搜索结果
    @observable searchResultList = [];
    @action setSearchResultList = (data = []) => {
        this.searchResultList = data;
    }

    // 关键字搜索结果 - 发起请求
    kwData = async (kw = '') => {
        const res = await service.kwData({
            kws: kw,
        });
        try{
            if( res.data.code === 200 ){
                if( res.data.data ){
                    res.data.data.forEach((item, index) =>{
                        item['key'] = index + 1;
                    });
                    this.setSearchResultList( res.data.data );
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();