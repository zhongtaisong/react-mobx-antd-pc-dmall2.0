import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

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

    // 查询用户名 和 商品编号
    getUnameAndPid = async (uid) => {
        const res = await service.getUnameAndPid();
        try{
            if( res.data.code === 200 ){
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
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();