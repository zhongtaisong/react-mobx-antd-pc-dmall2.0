import service from './service';
import { message } from 'antd';
import { observable, action } from 'mobx';

class State {

    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    registerData = async ( values ) => {
        const res = await service.registerData(values);
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                message.success('恭喜你，注册成功！');
                data && localStorage.setItem('uname', data); 
                this.history.push('/login');
            }else if( res.data.code === 201 ){
                message.error(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();