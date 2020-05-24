import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 标题
    @observable title = '添加品牌';
    @action setTitle = (data = '添加品牌') => {
        this.title = data;
    }

    // 查询所有品牌
    selectBrandData = async () => {
        const res = await service.selectBrandData({
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

    // 添加品牌
    addBrandData = async (values = {}) => {
        const res = await service.addBrandData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectBrandData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除品牌
    deleteBrandData = async (id) => {
        const res = await service.deleteBrandData({
            id
        });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectBrandData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改品牌
    updateBrandData = async (values = {}) => {
        const res = await service.updateBrandData({
            id: store.id,
            fname: values.fname
        });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectBrandData();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();