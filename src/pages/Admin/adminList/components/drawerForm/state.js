import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 用户列表
    @observable usersList = [];
    @action setUsersList = (data = []) => {
        this.usersList = data;
    }

    // 查询用户名
    getUname = async () => {
        const res = await service.getUname();
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
                }
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();