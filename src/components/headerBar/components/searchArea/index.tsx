import React from 'react';
import { Row, Col, Input, Button, Badge, message } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';
const { Search } = Input;

/**
 * 搜索区域
 */
@observer
class SearchArea extends React.Component<Partial<RouteComponentProps>, any> {
    
    componentDidMount() {
        state.productNumData(); 
    }

    // 展示搜索框
    showSearchInput = () => {
        state.setIsShowSearchInput02();
    }

    // 菜单列表
    menuList = () => {
        const { pathname } = this.props.location;
        const adminObj = toJS($state.adminObj);
        if( !pathname.includes('/views/admin') ){
            return (<>
                <Link to='/' className={ pathname == '/views/home' ? 'active' : '' }>首 页</Link>
                <Link to='/views/products' className={ 
                    pathname == '/views/products' || pathname.includes('/views/products/detail') ? 'active' : '' 
                }>杂货铺</Link>
                <Link to='/views/web' className={ pathname == '/views/web' ? 'active' : '' }>网站说明</Link>
                <Link to='/views/message' className={ pathname == '/views/message' ? 'active' : '' }>留言</Link>
            </>);
        }

        if( !adminObj || !Object.keys(adminObj).length ) return null;
        return (<>
            {
                adminObj['brandMenu'] ? (
                    <Link to='/views/admin/brand' className={ pathname == '/views/admin/brand' ? 'active' : '' }>品牌管理</Link>                            
                ) : ''
            }
            {
                adminObj['productMenu'] ? (
                    <Link to='/views/admin/product' className={ pathname == '/views/admin/product' ? 'active' : '' }>商品管理</Link>                          
                ) : ''
            }
            {
                adminObj['orderMenu'] ? (
                    <Link to='/views/admin/order' className={ pathname == '/views/admin/order' ? 'active' : '' }>订单管理</Link>                        
                ) : ''
            }
            {
                adminObj['userMenu'] ? (
                    <Link to='/views/admin/user' className={ pathname == '/views/admin/user' ? 'active' : '' }>用户管理</Link>                      
                ) : ''
            }
            {
                adminObj['commentMenu'] ? (
                    <Link to='/views/admin/comment' className={ pathname == '/views/admin/comment' ? 'active' : '' }>评论管理</Link>                     
                ) : ''
            }
            {
                adminObj['adminMenu'] ? (
                    <Link to='/views/admin/adminList' className={ pathname == '/views/admin/adminList' ? 'active' : '' }>权限管理</Link>                    
                ) : ''
            }
        </>);
    }

    render() {
        const { productNum } = state;
        const { history, location } = this.props;

        return (
            <>
                <div className='dm_SearchArea'>
                    <Row className='common_width dm_SearchArea__content'>
                        <Col span={ 4 } 
                            className='dm_SearchArea__content--logo' 
                            onClick={() => history.push("/")} 
                        />
                        <Col span={ 12 } className='dm_SearchArea__content--menu'>
                            { this.menuList() }
                        </Col>
                        <Col span={ 8 } className='dm_SearchArea__content--search'>
                            {
                                !location.pathname.includes('/views/admin') ? (
                                    <>
                                        <Search 
                                            className='dm_SearchArea__content--search__input'
                                            placeholder="请输入关键字" 
                                            enterButton 
                                            onSearch={ this.getSearchKws } 
                                        />
                                        <Badge count={ productNum } overflowCount={ 99 }>
                                            <Button 
                                                icon={ <ShoppingCartOutlined style={{ fontSize: 16 }} /> } 
                                                type="primary" 
                                                className='dm_SearchArea__content--search__cart'
                                                onClick={ this.goShopCartFn }
                                            />
                                        </Badge>
                                    </>
                                ) : ''
                            }
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

    /**
     * 获取搜索关键字
     * @param value 关键字
     * @returns 
     */
    getSearchKws = (value: string) => {
        value = value?.trim?.();
        if(!value){
            return message.error('关键字不能为空！');
        }

        state.kwData(value);
    }

    /**
     * 进入 - 购物车页面
     */
    goShopCartFn = () => {
        const { oauthCode } = $state;
        const { history } = this.props;
        const isAuth = oauthCode && oauthCode !== 401;
        let pathname = "/views/cart";
        if(!isAuth) {
            pathname = "/login";
        }
        history.push(pathname);
    }
}

export default SearchArea;