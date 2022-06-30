import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Button, Typography, Col, Select, message } from 'antd';
import { toJS } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 全局设置
import { searchAreaState } from '@config';
// 各种表头
import { columns02 } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 结算页
@observer
class SettlementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: []
        };
    }

    componentDidMount() {
        const { state: ste } = this.props.location;
        if( ste && ste.id && ste.type ){
            state.settlementData(ste.id, ste.type, ste.num);
            this.setState({
                pid: ste.id
            });
        }
    }

    // 提交订单
    handleSubmitOrders = async () => {
        let { selectAddress, num, totalprice, nums } = state;
        const orderId = await state.addorderData({
            uname: session.getItem('uname'), 
            pid: this.state.pid, 
            aid: selectAddress.id,
            num,
            totalprice,
            nums
        });
        if( orderId ){
            // 提交订单成功后，刷新购物车商品数量
            searchAreaState.productNumData();
            this.props.history.replace({
                pathname: '/views/products/cart/orderDetails',
                state: {
                    id: orderId
                }
            });
        }else{
            message.error('订单主键orderId不能为空！');
        }
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        let { dataSource02, selectAddress, dataSource01, setSelectAddress, num, totalprice } = state;
        const { name, region, detail, phone } = selectAddress || {};
        selectAddress = toJS(selectAddress) || {};
        dataSource01 = toJS(dataSource01) || [];
        return (
            <div className='common_width dm_SettlementPage'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>结算页</Typography.Title>
                    <div></div>
                </Row>
                {
                    dataSource02.length ? (
                        <Table 
                            columns={ columns02 } 
                            dataSource={ toJS(dataSource02) }
                            pagination={ false }
                            rowKey={ (record) => record.id }
                            scroll={ dataSource02.length > 2 ? { y: 220 } : { y: false } }
                        />
                    ) : ''
                }
                <Row className='pay_info'>
                    <Col span={ 12 }>
                        {
                            Object.keys(selectAddress).length ? (
                                <div title={ name }>收件人：
                                    <Select className='pay_info_select' placeholder='请选择' 
                                        defaultValue={ selectAddress.id } 
                                        onChange={
                                            (value, option) => {
                                                let res = dataSource01.filter(item => item.id == value);
                                                res.length && setSelectAddress(res[0]);
                                            }
                                        }
                                    >
                                        {
                                            dataSource01.map(item => {
                                                return (
                                                    <Select.Option key={ item.id } value={ item.id }>{ item.name }</Select.Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </div>
                            ) : ''
                        }
                        <div title={ `${region}${detail}` }>收件地址：{ `${region || ''}${detail || ''}` }</div>
                        <div title={ phone }>联系电话：{ phone || '' }</div>
                    </Col>
                    <Col span={ 12 } className='pay_money'>
                        <div><span>{ num }</span> 件商品</div>
                        <div>总金额：<span>￥{ Number(totalprice) ? Number(totalprice).toFixed(2) : 0 }</span></div>
                        <div>应付金额：<span>￥{ Number(totalprice) ? Number(totalprice).toFixed(2) : 0 }</span></div>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center' }}>
                    <Button style={{ width: '10%' }} type='primary' onClick={ this.handleSubmitOrders }>提交订单</Button>
                </Row>
            </div>
        );
    }
}

export default SettlementPage;