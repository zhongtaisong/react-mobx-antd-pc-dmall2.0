import React from 'react';
import { observer } from 'mobx-react';
import { Table, Typography, Row, Col, Popconfirm, Icon } from 'antd';

// 各种表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的订单
@observer
class MyOrder extends React.Component {

    componentWillMount() {
        state.setHistory(this.props.history);
    }

    componentDidMount() {
        state.selOrdersData();
    }

    title = (submitTime, ordernum, orderId) => {
        return (
            <Row className='t_header'>
                <Col span={ 6 }>{ submitTime }</Col>
                <Col span={ 6 }>订单号： { ordernum }</Col>
                <Col span={ 12 }>
                    <Popconfirm
                        title="你确定要删除这条数据？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => {
                            state.deleteOrderData({
                                id: orderId
                            });
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <span>删</span>
                    </Popconfirm>
                </Col>
            </Row>
        );
    }
    
    render() {
        const { dataSource } = state;
        return (
            <div className='common_width dm_MyOrder'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的订单</Typography.Title>
                    <div>（当前共有 <i>{ dataSource.length }</i> 笔订单）</div>
                </Row>
                {/* 表头 */}
                <Table 
                    columns={ columns } 
                    dataSource={[]} 
                    pagination={ false }
                    scroll={{ x: false, y: false }}
                    bordered
                    size='middle'
                    className='table_header'
                />
                {
                    dataSource.map(item => {
                        return (
                            <div style={{ marginBottom: '20px' }} key={ item.id }>
                                <Table 
                                    columns={ columns } 
                                    dataSource={ item.content } 
                                    rowKey={ (record) => record.id }
                                    pagination={ false }
                                    scroll={{ x: false, y: false }}
                                    bordered
                                    showHeader={ false }
                                    title={ this.title.bind(this, item.submitTime, item.ordernum, item.id) }
                                    size='middle'
                                />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default MyOrder;