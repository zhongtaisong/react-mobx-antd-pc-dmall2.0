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

    // 所有商品编号
    @observable lidList = [];
    @action setLidList = (data = []) => {
        this.lidList = data;
    }

    /**
     * 查询 - 用户名、商品编号
     */
    getUnameAndPidFn = async () => {
        const res = await service.getUnameAndPid();
        if(res?.data?.code === 200){
            let { data } = res.data || {};
            if( data ){
                if( data.uname ){
                    let newData = data.uname.map((item, index) => {
                        return ({
                            value: item.uname,
                            text: item.uname
                        });
                    });
                    this.setUsersList( newData );
                }
                if( data.id ){
                    let newData = data.id.map((item, index) => {
                        return ({
                            value: item.id,
                            text: item.id
                        });
                    });
                    this.setLidList( newData );
                }
            }
        }
    }
    
}

export default new State();