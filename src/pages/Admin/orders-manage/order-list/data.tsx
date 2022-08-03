import React from 'react';
import { Popconfirm } from 'antd';
    
// 表头
export default ({ onDeleteClick, onDetailClick }: {
    /**
     * 删除操作
     */
    onDeleteClick: Function;
    /**
     * 查看订单
     */
    onDetailClick: Function;
}) => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: 70,
            render: (text, record, index) => `${index+1}`,
        },
        {
            title: '用户名',
            dataIndex: 'uname',
            key: 'uname',
        },
        {
            title: '订单号',
            dataIndex: 'ordernum',
            key: 'ordernum',
        },
        {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: '总金额',
            dataIndex: 'totalprice',
            key: 'totalprice',
        },
        {
            title: '支付时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            render: (text, record, index) => {
                return {
                    children: (
                        <div className='operation-btn'>
                            <span onClick={() => onDetailClick?.(record?.id)} >查看</span>
                            <Popconfirm title="你确定要删除？" 
                                onConfirm={ () => onDeleteClick?.(record?.id) }
                            >
                                <span>删除</span>
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

    columns.forEach(item => {
        if(!item.render) {
            item['render'] = (text) => text || '-';
        }
    })
    return columns;
};