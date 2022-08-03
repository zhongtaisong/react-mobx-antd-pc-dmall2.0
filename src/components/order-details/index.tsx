import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Col, Typography } from 'antd';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 订单详情
 */
@observer
class Index extends React.PureComponent<any, any> {

    componentDidMount() {
        state.detailOrdersDataFn(this.props?.id);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(prevProps?.id !== this.props?.id) {
            state.detailOrdersDataFn(this.props?.id);
        }
    }

    render() {
        const { isTitle=true, className='' } = this.props;
        const { 
            dataSource02, orderInfo,
            consignees,
        } = state;
        const { ordernum, submitTime, num, totalprice } = orderInfo as any;
        const { detail, name, phone, region } = consignees as any;

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
                        columns={[
                            {
                                title: '图片',
                                dataIndex: 'mainPicture',
                                key: 'mainPicture',
                                width: '14%',
                                render: (text, record, index) => <img className='imgs_style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
                            },
                            {
                                title: '商品',
                                dataIndex: 'description',
                                key: 'description',
                                width: '30%',
                                render: (text, record, index) => <Link to={'/views/products/detail/' + record.id}>{ text }</Link>
                            },
                            {
                                title: '规格',
                                dataIndex: 'spec',
                                key: 'spec',
                                width: '20%',
                            },
                            {
                                title: '单价',
                                dataIndex: 'price',
                                key: 'price',
                                render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
                            },
                            {
                                title: '数量',
                                dataIndex: 'num',
                                key: 'num',
                                render: (text, record, index) => `x ${text}`
                            }
                        ]} 
                        dataSource={ toJS( dataSource02 ) }
                        showHeader={ false }
                        pagination={ false }
                        rowKey={ (record) => record.id }
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