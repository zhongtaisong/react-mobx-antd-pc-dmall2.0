import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 标题
    @observable title = '';
    @action setTitle = (data = '') => {
        this.title = data;
    }

    // 查询所有权限用户 - 发起请求
    selectData = async () => {
        const res = await service.selectData({
            current: store.current,
            pageSize: store.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { data, current, pageSize, total } = res.data.data || {};
                data.forEach(item => {
                    item['brandMenu'] = item['brandMenu'] ? true : false;
                    item['brandBtn'] = item['brandBtn'] ? JSON.parse(item['brandBtn']) : [];
                    item['productMenu'] = item['productMenu'] ? true : false;
                    item['productBtn'] = item['productBtn'] ? JSON.parse(item['productBtn']) : [];
                    item['orderMenu'] = item['orderMenu'] ? true : false;
                    item['orderBtn'] = item['orderBtn'] ? JSON.parse(item['orderBtn']) : [];
                    item['userMenu'] = item['userMenu'] ? true : false;
                    item['userBtn'] = item['userBtn'] ? JSON.parse(item['userBtn']) : [];
                    item['commentMenu'] = item['commentMenu'] ? true : false;
                    item['commentBtn'] = item['commentBtn'] ? JSON.parse(item['commentBtn']) : [];
                    item['adminMenu'] = item['adminMenu'] ? true : false;
                    item['adminBtn'] = item['adminBtn'] ? JSON.parse(item['adminBtn']) : [];
                });
                store.setDataList( data );
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

    // 添加 / 修改用户权限 - 发起请求
    editData = async (values = {}) => {
        const res = await service.editData(values);
        try{
            const { data, code, msg } = res.data || {};
            if( code === 200 ){
                message.success( res.data.msg );
                this.selectData();
            }else if( code === 201 ){
                message.error(msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除用户权限 - 发起请求
    deleteData = async (obj = {}) => {
        const res = await service.deleteData(obj);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectData();     
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setTitle();
    }

}

export default new State();