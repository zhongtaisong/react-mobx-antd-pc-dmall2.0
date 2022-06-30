import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 订单号
    @observable orderNum = null;
    @action setOrderNum = (data = null) => {
        this.orderNum = data;
    }

    // 用户列表
    @observable usersList = [];
    @action setUsersList = (data = []) => {
        this.usersList = data;
    }

    // 查询全部订单 - 发起请求
    selectOrdersData = async () => {
        const res = await service.selectOrdersData({
            current: store.current,
            pageSize: store.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data || {};
                products.map((item, index) => {
                    return item['key'] = index + 1;
                });
                store.setDataList( products );
                store.setCurrent( current );
                store.setPageSize( pageSize );
                store.setTotal( total );
                // 清除抽屉内部数据
                store.clearMobxData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除指定订单 - 发起请求
    deleteOrdersData = async (obj = {}) => {
        const res = await service.deleteOrdersData(obj);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectOrdersData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询所有用户 - 发起请求
    selectUsersData = async () => {
        const res = await service.selectUsersData();
        try{
            if( res.data.code === 200 ){
                let { data } = res.data || {};
                if( data && data.products ){
                    let newData = data.products.map((item, index) => {
                        return ({
                            value: item.uname,
                            text: item.uname
                        });
                    });
                    this.setUsersList( newData );
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setOrderNum();
        this.setUsersList();
    }
}

export default new State();