import React, { Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
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
        if( that == 'login' ){
            this.props.history.push('/login');
        }else if( that == 'register' ){
            this.props.history.push('/register');
        }else if( that == 'order' ){
            this.props.history.push('/views/products/order');
        }else if( that == 'collection' ){
            this.props.history.push('/views/products/collection');
        }else if( that == 'userCenter' ){
            this.props.history.push('/views/user');
        }else if( that == 'logout' ){
            state.logoutData();
        }else if( that == 'admin' ){
            this.props.history.push('/admin');
        }
    }

    render() {
        const { uname } = $state;
        return (
            <div className='dm_topMenu_adm'>
                <Row className='common_width'>
                    <Col span={ 6 }>Demo_Mall前台页面由此进入</Col>
                    <Col span={ 18 }>
                        <span>欢迎你，闹钟太松了</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'logout') }>退出</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'order') }>消息</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'collection') }>操作日志</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'userCenter') }>超级管理员列表</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TopMenu;