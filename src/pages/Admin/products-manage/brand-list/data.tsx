import React from 'react';
import { Popconfirm } from 'antd';
    
// 表头
export default ({ onUpdateClick, onDeleteClick }: {
    /**
     * 更新操作
     */
    onUpdateClick: Function;
    /**
     * 删除操作
     */
    onDeleteClick: Function;
}) => {
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: '6%',
            render: (text, record, index) => `${index+1}`
        },
        {
            title: '品牌名称',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            width: '12%',
            render: (text, record, index) => {
                return (
                    <div className='operation-btn'>
                        <span onClick={() => onUpdateClick?.(record)} >更新</span>
                        <Popconfirm title="你确定要删除？"
                            onConfirm={() => onDeleteClick?.(record?.id)}
                        >
                            <span>删除</span>
                        </Popconfirm>
                    </div>
                );
            }
        }
    
    ];
};
