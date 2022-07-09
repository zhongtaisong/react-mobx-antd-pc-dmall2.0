import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BackTop, Spin } from 'antd';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import RouteList from '@router';
// 401、402、403、404
import ResultPages from '@pages/ResultPages';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
import './index.less';
import { StaticContext } from 'react-router';

/**
 * 根页面
 */
@observer
class Index extends React.Component<RouteComponentProps, any> {

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
        this.initDid();
    }

    initDid = () => {
        state.oauthData();
        state.adminData();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{}, StaticContext, unknown>>, prevState: Readonly<any>, snapshot?: any): void {
        this.initDid();
    }

    render() {
        const { oauthCode, isLoading } = $state;

        return (
            <div className='pages_index'>
                <BackTop className='pages_index__backTop' />
                <HeaderBar {...this.props} />
                <Spin spinning={ isLoading } tip="加载中...">
                    <div className='pages_index__content'>
                        <Switch>
                            {
                                RouteList.map(item => {
                                    const isAuth = oauthCode && oauthCode === 401 && item?.noDirectAccess;
                                    if(item.redirect){
                                        const redirectParams = {
                                            from: isAuth ? "*": item?.path,
                                            to: isAuth ? '/login' : item?.redirect,
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
                                                    if(isAuth){
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