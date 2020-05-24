import React from 'react';
import { observer } from 'mobx-react';
import { Table, Typography, Row, Col, message, Button } from 'antd';
import { toJS } from 'mobx';
// 各种表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的购物车
@observer
class MyShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            cartId: []
        };
    }

    componentDidMount() {
        state.cartLisData();        
    }

    // 选中行
    rowSelection = {
        // fixed: true,
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState(() => ({
                selectedRowKeys,
                selectedRows
            }));
            let sRows = selectedRows.map((item, index) => {
                return { totalP: [ item.num, item.totalprice ] };
            });
            state.setPriceList01( sRows );
            let data = selectedRows.map(item => {
                if( selectedRowKeys.includes(item.pid) ){
                    return item.id;
                }
            });
            this.setState({
                cartId: data
            });
        }
    };

    // 表格底部
    footer = () => {
        let total = 0;
        let size = 0;
        toJS( state.priceList ).forEach((item, index) => {
            total += item.totalP[1];
            size += item.totalP[0];
        });
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button onClick={ this.handleDeleteProduct }>批量删除</Button>
                    <Button onClick={ this.handleCollectionProduct }>批量加入收藏</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ size }</i>件商品</span>
                    <div>
                        总价：<span>¥{ total.toFixed(2) }</span>
                    </div>
                    <span className='go-pay' onClick={ this.handleGoPay }>去结算</span>
                </Col>
            </Row>
        );
    }

    // 结算
    handleGoPay = () => {
        const { selectedRows, selectedRowKeys } = this.state;
        if( selectedRows.length ){
            this.props.history.push({
                pathname: '/views/products/cart/settlement',
                state: {
                    id: selectedRowKeys,
                    type: 'cart'
                }
            });
        }else{
            message.warning('请选择需要结算的商品！');
        }
    }

    // 删除
    handleDeleteProduct = () => {
        const { cartId } = this.state;
        if( cartId.length ){
            state.delcartData(cartId);
            this.setState(() => ({
                selectedRowKeys: [],
                selectedRows: []
            }));
        }else{
            message.warning('请选择需要删除的商品！');
        }
    }

    // 收藏
    handleCollectionProduct = () => {
        const { cartId } = this.state;
        if( cartId.length ){
            state.addcolsData(cartId);
        }else{
            message.warning('请选择需要收藏的商品！');
        }
    }

    render() {
        const { dataSource, allProductsSize } = state;
        return (
            <div className='common_width dm_MyShoppingCart'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的购物车</Typography.Title>
                    <div>（当前购物车共有 <i>{ allProductsSize }</i> 件商品）</div>
                </Row>
                <Table 
                    columns={ columns } 
                    dataSource={ toJS(dataSource) } 
                    pagination={ false }
                    scroll={{ x: false, y: 330 }}
                    footer={ this.footer }
                    bordered
                    rowSelection={ this.rowSelection } 
                    rowKey={ (record) => record.pid }
                />
            </div>
        );
    }
}

export default MyShoppingCart;