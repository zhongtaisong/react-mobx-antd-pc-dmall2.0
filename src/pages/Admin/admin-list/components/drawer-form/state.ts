import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 用户列表
    @observable usersList = [];
    @action setUsersList = (data = []) => {
        this.usersList = data;
    }

    // 角色列表
    @observable roleList = [];
    @action setRoleList = (data = []) => {
        this.roleList = data;
    }

    /**
     * 查询 - 所有用户
     */
    getUnameFn = async () => {
        const res = await service.getUname();
        if(res?.data?.code === 200){
            this.setUsersList(res?.data?.data?.uname_list || []);
            this.setRoleList(res?.data?.data?.role_list || []);
        }
    }
}

export default new State();