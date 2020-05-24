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

// 我的收藏
@observer
class MyCollection extends React.Component {

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
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button onClick={ this.handleDeleteProduct }>批量删除</Button>
                    <Button onClick={ this.handleCollectionProduct }>批量加入购物车</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ this.state.selectedRowKeys.length }</i>件商品</span>
                </Col>
            </Row>
        );
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

    // 加入购物车
    handleCollectionProduct = () => {
        const { cartId } = this.state;
        if( cartId.length ){
            state.addcolsData(cartId);
        }else{
            message.warning('请选择需要加入购物车的商品！');
        }
    }

    render() {
        const { dataSource } = state;
        return (
            <div className='common_width dm_MyCollection'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的收藏</Typography.Title>
                    <div>（当前共有 <i>{ dataSource.length }</i> 件藏品）</div>
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

export default MyCollection;