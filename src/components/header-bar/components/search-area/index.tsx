import React from 'react';
import { Row, Col, Input, Button, Badge } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';
import lodash from 'lodash';
import { MENU_LIST_01, MENU_LIST_02 } from './data';
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

    render() {
        const { productNum } = state;
        const { history, location } = this.props;
        const adminObj = toJS($state.adminObj);

        return (
            <>
                <div className='dm_SearchArea'>
                    <Row className='common_width dm_SearchArea__content'>
                        <Col span={ 4 } 
                            className='dm_SearchArea__content--logo' 
                            onClick={() => history.push("/")} 
                        >
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-logo"></use>
                            </svg>
                        </Col>
                        <Col span={ 12 } className='dm_SearchArea__content--menu'>
                            {
                                !location.pathname.includes('/views/admin') ? (
                                    <>
                                        {
                                            MENU_LIST_01.map(item => {
                                                return (
                                                    <Link 
                                                        key={ item.key }
                                                        to={ item.pathname } 
                                                        className={ location.pathname === item.pathname ? 'active' : '' }
                                                    >{ item.name }</Link>
                                                );
                                            })
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            adminObj && Object.keys(adminObj).length && MENU_LIST_02.map(item => {
                                                if(!adminObj[item.authKey]) return null;

                                                return (
                                                    <Link 
                                                        key={ item.key }
                                                        to={ item.pathname } 
                                                        className={ location.pathname === item.pathname ? 'active' : '' }
                                                    >{ item.name }</Link>
                                                );
                                            })
                                        }
                                    </>
                                )
                            }
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
    getSearchKws = lodash.debounce((value: string) => {
        state.kwData(value?.trim?.());
    }, 360);

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