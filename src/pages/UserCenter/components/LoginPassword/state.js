import { message } from 'antd';
import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 修改登录密码
    updateUpwdData = async (obj = {}) => {
        const res = await service.updateUpwdData({
            uname: session.getItem('uname'),
            ...obj
        });
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                window.location.replace('/login');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();