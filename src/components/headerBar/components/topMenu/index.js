import React, { Fragment } from 'react';
import { Row, Col, Icon, message } from 'antd';
import { observer } from 'mobx-react';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 顶部菜单
@observer
class TopMenu extends React.Component {

    // 跳转到目标页面
    intoTargetPage = (that) => {
        const { oauthCode, admin } = $state;
        if( that == 'login' ){
            this.props.history.push('/login');
        }else if( that == 'register' ){
            this.props.history.push('/register');
        }else if( that == 'logout' ){
            state.logoutData();
        }else{
            if( oauthCode && oauthCode != 401 ){
                if( that == 'admin' ){
                    if( admin == 1 ){
                        this.props.history.push(`/views/${that}`);
                    }else{
                        message.error('您不是管理员，无权进入后台！');
                    }
                }else{
                    this.props.history.push(`/views/${that}`);
                }
            }else{
                message.error('尚未登录，无法访问该页面！点击logo跳转首页');
                this.props.history.replace('/login');
            }
        }
    }

    render() {
        const { uname, admin } = $state;
        const { pathname } = this.props.location;
        return (
            <div className='dm_topMenu'>
                <Row className='common_width'>
                    <Col span={ 6 }>
                        <Icon type="environment" style={{ paddingRight: '4px' }} />
                        上海
                    </Col>
                    <Col span={ 18 }>
                        {
                            uname ? (
                                <Fragment>
                                    <span>欢迎你，{ uname }</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'logout') }>退出登录</span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <span onClick={ this.intoTargetPage.bind(this, 'login') }>登录</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'register') }>注册</span>
                                </Fragment>
                            )
                        }
                        {
                            !pathname.includes('/views/admin') ? (
                                <Fragment>
                                    <span onClick={ this.intoTargetPage.bind(this, 'order') }>我的订单</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'collection') }>我的收藏</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'user') }>用户中心</span>
                                    {
                                        admin == 1 ? (
                                            <span onClick={ this.intoTargetPage.bind(this, 'admin') }>商城后台</span>
                                        ) : ''
                                    }
                                </Fragment>
                            ) : ''
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TopMenu;