import React from 'react';
import { observer } from 'mobx-react';
import { Table, Typography, Popconfirm, Pagination } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
// 各种表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 我的订单
 */
@observer
class MyOrder extends React.Component<any, any> {

    componentDidMount() {
        state.selOrdersDataFn({
            current: 0,
        });
    }
    
    render() {
        const { dataSource, total, } = state;

        return (
            <div className='common_width dm_MyOrder'>
                <div className='dm_MyOrder__title'>
                    <Typography.Title level={ 4 }>我的订单</Typography.Title>
                    <div>( 共有 <i>{ total }</i> 笔订单 )</div>
                </div>

                {/* 表头 */}
                <Table 
                    className='dm_MyOrder__columns'
                    columns={ columns as any } 
                    dataSource={[]} 
                    pagination={ false }
                    bordered
                    size='middle'
                />
                {
                    dataSource.map(item => {
                        return (
                            <div 
                                key={ item.id }
                                style={{ marginBottom: '20px' }} 
                            >
                                <Table 
                                    columns={ columns as any } 
                                    dataSource={ item?.goods_infos || [] } 
                                    pagination={ false }
                                    showHeader={ false }
                                    bordered
                                    size='middle'
                                    title={() => {
                                        return (
                                            <div className='dm_MyOrder__table'>
                                                <div className='dm_MyOrder__table--left'>
                                                    <span>订单号：{ item?.ordernum }</span>
                                                    <span>下单时间：{ item?.submitTime }</span>
                                                </div>

                                                <div className='dm_MyOrder__table--right'>
                                                    <Popconfirm
                                                        title="你确定要删除这条数据？"
                                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                        onConfirm={() => state.deleteOrderDataFn(item?.id)}
                                                        okText="是"
                                                        cancelText="否"
                                                    >
                                                        <DeleteOutlined />
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        );
                                    }}
                                    rowKey="id"
                                />
                            </div>
                        );
                    })
                }

                {
                    dataSource?.length ? (
                        <div className='dm_MyOrder__pagination'>
                            <Pagination
                                showSizeChanger
                                total={ total }
                                showTotal={total => `共 ${ total } 条`}
                                onChange={
                                    (current, pageSize) => {
                                        state.selOrdersDataFn({
                                            current: current - 1,
                                            pageSize,
                                        });
                                    }
                                }
                            />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default MyOrder;