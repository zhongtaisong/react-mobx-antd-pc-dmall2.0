import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import moment from 'moment';
import { message } from 'antd';
// 接口服务
import service from './service';
// url前缀
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 个人资料 - 头像
    @observable fileListArr = [];
    @action setFileListArr = (data = []) => {
        this.fileListArr = data;
    }

    /**
     * 查询 - 个人资料 - 操作
     * @returns 
     */
    selectUserInfoData = async () => {
        const res = await service.fetchSelectUserInfoData();

        if(res?.data?.code === 200){
            let { data } = res?.data || {};
            if(!data || !Object.keys(data).length) {
                data = {};
            };

            this.setFileListArr([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${ PUBLIC_URL }${ data?.avatar }`,
            }]);
            return {
                ...data,
                birthday: moment(data?.['birthday']),
            }
        }
    }

    /**
     * 更新 - 个人资料 - 操作
     * @param params 
     */
    updateUserInfoData = async (params = {}) => {
        const res = await service.fetchUpdateUserInfoData(params);
        if( res.data.code === 200 ){
            message.success(res.data.msg);
        }else {
            message.error("操作失败！");
        }
    }

    /**
     * 更新 - 登录密码 - 操作
     * @param params 
     * @returns 
     */
    updateUpwdData = async (params = {}) => {
        const res = await service.fetchUpdateUpwdData({ ...params });
        if( res?.data?.code === 200 ){
            message.success(res.data.msg);
            return true;
        }else {
            message.error("操作失败！");
        }
    }

    // 登录密码
    @observable loginPassword = {};
    @action setLoginPassword01 = (data = {}) => {
        this.loginPassword = data;
    }
    @action setLoginPassword02 = (key, value) => {
        this.loginPassword[key] = value;
    }
}

export default new State();