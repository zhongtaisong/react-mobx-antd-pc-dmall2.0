import React from 'react';
import { Popconfirm } from 'antd';
import { toJS } from 'mobx';
// 公共数据
import { store } from '@pages/Admin/components';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
    
// 表头
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        render: (text, record, index) => index + 1,
        width: '6%'
    },
    {
        title: '用户名',
        dataIndex: 'uname',
        key: 'uname',
        align: 'center',
        width: '20%'
    },
    {
        title: '订单号',
        dataIndex: 'ordernum',
        key: 'ordernum',
        align: 'center',
        width: '20%'
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        width: '10%'
    },
    {
        title: '总金额',
        dataIndex: 'totalprice',
        key: 'totalprice',
        align: 'center',
        width: '10%'
    },
    {
        title: '支付时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
        align: 'center',
        // width: '20%',
        ellipsis: true
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        // fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            let { orderBtn } = toJS($state.adminObj) || {};
            orderBtn = orderBtn ? JSON.parse(orderBtn) : [];
            return {
                children: (
                    <div className='operation_btn'>
                        <a onClick={ () => {
                            if(!orderBtn.includes(4)) return;
                            store.setDrawerVisible( true );
                            store.setId( record.id );
                        } } disabled={ !orderBtn.includes(4) }>查看</a>
                        <Popconfirm title="你确定要删除？" 
                            disabled={ !orderBtn.includes(2) }
                            onConfirm={ () => state.deleteOrdersData({
                                id: record.id
                            }) }
                        >
                            <a disabled={ !orderBtn.includes(2) }>删除</a>
                        </Popconfirm>
                    </div>
                ),
                props: {
                    rowSpan: record.tableLen
                }
            };
        }
    }
];