import { action, observable } from 'mobx';
// 接口服务
import service from './service';
// 全局数据
import $state from '@store';
// 全局设置
import { searchAreaState } from '@config';

class State {

    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 发起账号认证
    oauthData = async () => {
        searchAreaState.setIsShowResultPage();
        searchAreaState.setIsShowSearchInput();
    
        const res = await service.oauthData();
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                data.uname && $state.setUname( data.uname );
                data.token && $state.setToken( data.token );
                $state.setAdmin( data.admin );
            }else{
                $state.setUname();
                $state.setToken();
                $state.setAdmin();
            }
            $state.setOauthCode( res.data.code );
        }catch(err) {
            console.log(err);
        }
    }

    // 菜单 和 按钮 权限
    adminData = async () => {
        let uname;
        if( sessionStorage.getItem('uname') ){
            uname = sessionStorage.getItem('uname');
        }else{
            if( localStorage.getItem('uname') ){
                uname = localStorage.getItem('uname');
            }else{
                return;
            }
        }
        const res = await service.adminData({ uname });
        try{
            if( res.data.code === 200 ){
                res.data.data && $state.setAdminObj(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();