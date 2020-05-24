import axios from "axios";
import { message } from 'antd';
// 设置
import { PUBLIC_URL, BLACK_LIST_PATH } from '@config';
// 全局数据
import $state from '@store';

const $axios = axios.create({
    baseURL: PUBLIC_URL,
    timeout: 60 * 1000,
    withCredentials: true
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$axios.interceptors.request.use(
    config => {
        return config;
    }, 
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
$axios.interceptors.response.use(
    response => {
        const { config: { url }, data } = response || {};
        if( data ){
            $state.setIsLoading( false );
        }
        // 对响应数据做点什么
        return response;
    }, 
    error => {
        const { config: { url }, code, request, response } = error || {};
        if( code == 'ECONNABORTED' ){
            message.error(`${ url } 请求超时！`);
            $state.setIsLoading( false );
        }
        if (error.response) {
            const { pathname } = window.location || {};
            const { data, status, request: { responseURL } } = error.response || {};
            switch (status) {
                case 401:
                    // 返回 401 清除token信息并跳转到404页面
                    // topMenuState.logoutData();
                    if( BLACK_LIST_PATH.includes( pathname ) ){
                        // window.location.replace('/views/401');
                    }
                    // window.location.replace('/login');
                    break;
                case 404:
                    message.error(data.msg );
                    break;
                // default:                    
                //     message.error(data.msg );
            }
        }
        $state.setIsLoading( false );
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default $axios;