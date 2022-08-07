import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { BackTop, Spin } from 'antd';
import { StaticContext } from 'react-router';
import { commonFn } from '@utils';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import routeList from '@router';
// 401、402、403、404
import ResultPages from '@pages/result-pages';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
import './index.less';

/**
 * 根页面
 */
class Index extends React.PureComponent<RouteComponentProps, any> {

    componentDidMount() {
        state.adminData();
    }

    render() {
        const { isLoading } = $state;
        const isLogin = commonFn.isLogin();

        return (
            <div className='pages_index'>
                <BackTop className='pages_index__backTop' />
                <HeaderBar {...this.props} />
                <Spin spinning={ isLoading } tip="加载中...">
                    <div className='pages_index__content'>
                        <Switch>
                            {
                                routeList.map(item => {
                                    const isAuth = isLogin || item?.isOpen;

                                    if(item.redirect){
                                        const redirectParams = {
                                            from: isAuth ? item?.path :  "*",
                                            to: isAuth ? item?.redirect : '/login',
                                        }
                                        return (
                                            <Redirect key={ item.id } exact {...redirectParams} />
                                        );
                                    }

                                    return (
                                        <Route 
                                            key={ item.id }
                                            exact
                                            path={ item.path }
                                            render={
                                                (props: RouteComponentProps) => {
                                                    if(!isAuth){
                                                        return (<Redirect to={ '/login' } />);
                                                    }

                                                    return (<item.component {...props} />);
                                                }
                                            }
                                        />
                                    );
                                })
                            }

                            <Route component={ ResultPages } />
                        </Switch>
                    </div>
                </Spin>
                <FooterCopyright {...this.props} />
            </div>
        );
    }
}

export default Index;