import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Col, Typography } from 'antd';
import { toJS } from 'mobx';
// 表头
import { columns02 } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 订单详情
@observer
class Index extends React.Component {

    componentDidMount() {
        const { id } = this.props || {};
        id && state.detailOrdersData({ id });
    }

    render() {
        const { isTitle=true, className='' } = this.props;
        const { 
            dataSource02, orderInfo: { ordernum, submitTime, num, totalprice },
            consignees: { detail, name, phone, region }
        } = state;
        let scrollObj = dataSource02 && dataSource02.length >= 3 ? { x: false, y: 220 } : { x: false, y: false };
        return (
            <div className={ `common_width dm_OrderDetails ${ className ? className : '' }` }>
                {
                    isTitle ? (
                        <Row className='table_title'>
                            <Typography.Title level={ 4 }>订单详情</Typography.Title>
                            <div>（订单号：<i>{ ordernum }</i>）</div>
                        </Row>
                    ) : ''
                }
                <Row style={{ borderTop: '1px solid #E8E8E8' }}>
                    <Table 
                        columns={ columns02 } 
                        dataSource={ toJS( dataSource02 ) }
                        showHeader={ false }
                        pagination={ false }
                        rowKey={ (record) => record.id }
                        scroll={ scrollObj }
                    />
                </Row>
                <Row className='orider_details'>
                    <Col span={ 12 }>
                        <dl>
                            <dt>收货人信息</dt>
                            <dd>
                                <div>收货人：</div>
                                <p>{ name }</p>
                            </dd>
                            <dd>
                                <div>所在地区：</div>
                                <p>{ region }</p>
                            </dd>
                            <dd>
                                <div>详情地址：</div>
                                <p>{ detail }</p>
                            </dd>
                            <dd>
                                <div>联系电话：</div>
                                <p>{ phone }</p>
                            </dd>
                        </dl>
                    </Col>
                    <Col span={ 12 }>
                        <dl>
                            <dt>付款信息</dt>
                            <dd>
                                <div>付款时间：</div>
                                <p>{ submitTime }</p>
                            </dd>
                            <dd>
                                <div>商品总数：</div>
                                <p>{ num }</p>
                            </dd>
                            <dd>
                                <div>商品总额：</div>
                                <p>￥{ Number(totalprice) ? Number(totalprice).toFixed(2) : totalprice }</p>
                            </dd>
                            <dd>
                                <div>应支付金额：</div>
                                <p>￥{ Number(totalprice) ? Number(totalprice).toFixed(2) : totalprice }</p>
                            </dd>
                        </dl>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;