import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BackTop, Spin } from 'antd';
import { toJS } from 'mobx';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 全局设置
import { searchAreaState } from '@config';
// 各级页面路由
import Routes from '@router';
// 401、402、403、404
import ResultPages from '@pages/ResultPages';
// 搜索结果页面
import SearchResults from '@pages/SearchResults';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

function Bus() {
    return <h3>Bus</h3>;
  }

// 根页面
@observer
class Index extends React.Component {

    componentWillMount() {        
        this.props.history && state.setHistory( this.props.history );
    }

    initDid = () => {
        state.oauthData();
        state.adminData();
    }

    componentDidMount() {
        this.initDid();
    }

    componentWillReceiveProps() {
        this.initDid();
    }

    render() {
        const { oauthCode, isLoading } = $state;
        const { isShowResultPage, searchResultList } = searchAreaState;
        return (
            <div>
                <BackTop style={{ right: '60px', bottom: '60px' }} />
                <HeaderBar {...this.props} />
                <Spin spinning={ isLoading } tip="Loading...">
                    {
                        !isShowResultPage ? (
                            <Switch>
                                {
                                    Routes.map(item => {
                                        if( item.redirect ){
                                            if( oauthCode && oauthCode == 401 && item.noDirectAccess ){
                                                return (<Redirect from={ this.props.location.pathname } to={ '/login' } key={ item.id } />);
                                            }else{
                                                return (<Redirect exact from={ item.path } to={ item.redirect } key={ item.id } />);
                                            }
                                        }else{
                                            return (
                                                <Route exact path={ item.path } key={ item.id }
                                                    render={
                                                        props => {
                                                            if( oauthCode && oauthCode == 401 && item.noDirectAccess ){
                                                                return (<Redirect from={ props.location.pathname } to={ '/login' } />);
                                                            }else{
                                                                return (<item.component {...props} />);
                                                            }
                                                        }
                                                    }
                                                />
                                            );
                                        }
                                    })
                                }
                                <Route path='/views/admin/pm/brands/list' component={ Bus } />
                                {/* 所有错误路由跳转页面 */}
                                {/* <Route component={ ResultPages } /> */}
                            </Switch>
                        ) : (
                            <SearchResults 
                                {...this.props}
                                searchResultList={ toJS( searchResultList ) }
                            />
                        )
                    }
                </Spin>
                <FooterCopyright {...this.props} />
            </div>
        );
    }
}

export default Index;