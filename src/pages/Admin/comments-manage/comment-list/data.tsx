import React from 'react';
import { Popconfirm } from 'antd';
    
// 表头
export default ({ onUpdateClick, onDeleteClick, onDetailClick }: {
    /**
     * 更新操作
     */
    onUpdateClick?: Function;
    /**
     * 删除操作
     */
    onDeleteClick: Function;
    /**
     * 查看操作
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
            render: (text, record, index) => index + 1,
        },
        {
            title: '用户名',
            dataIndex: 'uname',
            key: 'uname',
        },
        {
            title: '商品编号',
            dataIndex: 'pid',
            key: 'pid',
        },
        {
            title: '评论内容',
            dataIndex: 'content',
            key: 'content',
            width: 300,
        },
        {
            title: '评论时间',
            dataIndex: 'commentTime',
            key: 'commentTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            render: (text, record, index) => {
                return (
                    <div className='operation-btn'>
                        <span onClick={() => onDetailClick?.(record)} >查看</span>
                        <span onClick={() => onUpdateClick?.(record)} >更新</span>
                        <Popconfirm title="你确定要删除？" 
                            onConfirm={ () => onDeleteClick?.(record?.id) }
                        >
                            <span>删除</span>
                        </Popconfirm>
                    </div>
                );
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