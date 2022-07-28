import { message } from 'antd';
import { observable, action } from 'mobx';
import { cacheKey } from '@utils';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';
// 全局数据
import $state from '@store';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 提交新密码所需参数
    @observable upwdObj = {};
    @action setUpwdObj = (data = {}) => {
        this.upwdObj = data;
    }

    // 登录
    loginData = async (values, callBack) => {
        if(!values || !Object.keys(values).length) return;

        const res: any = await service.loginData(values);
        try{
            if( res.data.code === 200 ){
                const { isRemember } = values;
                const { data } = res.data || {};

                const key = cacheKey.USER_INFO;
                const value = JSON.stringify(data);
                if(isRemember === 1) {
                    localStorage.setItem(key, value);
                }else {
                    sessionStorage.setItem(key, value);
                }
                message.success('登录成功！');
                callBack?.();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 忘记密码 - 信息验证 - 下一步
    forgetPwdData = async ( values ) => {
        const res: any = await service.forgetPwdData(values);
        try{
            if( res.data.code === 200 ){
                const { data={} } = res.data || {};
                if(data) {
                    this.setUpwdObj(data);
                }
                message.success(res.data.msg);
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 提交新密码
    newPwdData = async ( values = {} ) => {
        const res: any = await service.newPwdData({
            ...values,
            isForgetPwd: true,
            ...this.upwdObj
        });
        try{
            if( res.data.code === 200 ){
                message.success('新密码提交成功！');
                res.data.data && localStorage.setItem('uname', res.data.data);      
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setUpwdObj();
    }
}

export default new State();