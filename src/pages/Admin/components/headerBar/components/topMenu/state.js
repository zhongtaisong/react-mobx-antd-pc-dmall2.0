// 接口服务
import service from './service';
// 全局数据
import $state from '@store';
// 全局设置
import { indexState } from '@config';

class State {

    // 退出登录
    logoutData = async () => {
        const res = await service.logoutData();
        try{
            if( res.data.code === 200 ){
                $state.setUname( res.data.data );
                let uname = sessionStorage.getItem('uname');
                uname && localStorage.setItem('uname', uname);
                sessionStorage.clear();
                indexState.oauthData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();