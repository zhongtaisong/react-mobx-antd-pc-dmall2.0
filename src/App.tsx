import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import axios from '@axios';
// 全局公共方法
import { ScrollToTop } from '@utils';
// 首页
import Index from '@pages';
// 登录
import Login from '@pages/login';
// 注册
import Register from '@pages/register';
// 401、402、403、404
import ResultPages from '@pages/result-pages';

// App
class App extends React.PureComponent<any, any> {

    componentDidMount() {
        this.selectDicData();
    }

    // 查字典表
    selectDicData = async () => {
        const res: any = await new Promise((resolve, reject) => {
            axios.get('dic/selectDic', {
                params: {}
            }).then((res: unknown) => {
                resolve(res);
            }).catch((err: any) => {
                console.log(err);
            });
        });
        
        try{
            if( res.data.code === 200 ){
                let { data } = res.data || {};
                if( data ){
                    data['GENDER'] = {
                        0: '男',
                        1: '女',
                        2: '保密'
                    };
                    sessionStorage.setItem('tableDic', JSON.stringify(data));
                    
                    let newData = data;
                    for(let k in newData){
                        let arr = [];
                        for(let [key, value] of Object.entries(newData[k])){
                            arr.push({
                                code: key,
                                name: value
                            });
                        }
                        newData[k] = arr;
                    }
                    sessionStorage.setItem('selectDic', JSON.stringify(newData));
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className='dm_App'>
                <BrowserRouter>
                    <ScrollToTop />
                    <Switch>
                        <Route path='/views' component={ Index } />
                        <Redirect exact from="/" to="/views" />
                        <Route path='/login' component={ Login } />
                        <Route path='/register' component={ Register } />
                        <Route
                            render={props => {
                                return (
                                    <ResultPages 
                                        extra={ 
                                            <Button 
                                                type="primary" 
                                                onClick={() => props?.history?.goBack?.() }
                                            >返回</Button> 
                                        }
                                    />
                                );
                            }} 
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;