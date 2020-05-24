import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
// logo图片
import logoImg from '@img/logo.png';
// 数据
import state from './state';
// less样式
import './index.less';
const { Search } = Input;

// 插入logo图片
const logoBg = {
    background: `url(${logoImg}) no-repeat`,
    height: '72px',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
};

// 搜索区域
@observer
class SearchArea extends React.Component {

    // 跳转页面
    handleClick = (that) => {
        if( that == 'goHome' ){
            this.props.history.push('/admin/home');
        }
    }

    // 菜单列表
    menuList = () => {
        const { pathname } = window.location;
        return (<Fragment>
            <Link to='/admin/home' className={ pathname == '/admin/home' ? 'active' : '' }>首 页</Link>
            <Link to='/admin/pm' className={ pathname.includes('/admin/pm') ? 'active' : '' }>商品管理</Link>
            <Link to='/admin/om' className={ pathname.includes('/admin/om') ? 'active' : '' }>订单管理</Link>
            <Link to='/admin/um' className={ pathname.includes('/admin/um') ? 'active' : '' }>用户管理</Link>
            <Link to='/admin/cm' className={ pathname.includes('/admin/cm') ? 'active' : '' }>评论管理</Link>
        </Fragment>);
    }

    render() {
        return (
            <Fragment>
                <div className='dm_SearchArea'>
                    <Row className='common_width'>
                        <Col span={ 4 } className='logo' onClick={ this.handleClick.bind(this, 'goHome') } style={ logoBg }></Col>
                        <Col span={ 16 }>{ this.menuList() }</Col>
                        <Col span={ 4 }></Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default SearchArea;