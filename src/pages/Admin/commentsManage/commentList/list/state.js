import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 标题
    @observable title = '添加评论';
    @action setTitle = (data = '添加评论') => {
        this.title = data;
    }

    // 查询所有用户评价 - 发起请求
    selectCommentData = async () => {
        const res = await service.selectCommentData({
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

    // 删除评价 - 发起请求
    deleteCommentData = async (id) => {
        const res = await service.deleteCommentData({ id });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectCommentData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 添加评价 - 发起请求
    addCommentData = async (values) => {
        const res = await service.addCommentData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectCommentData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改评价 - 发起请求
    updateCommentData = async (values) => {
        const res = await service.updateCommentData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectCommentData();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();