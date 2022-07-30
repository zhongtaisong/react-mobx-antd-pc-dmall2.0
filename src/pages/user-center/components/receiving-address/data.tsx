import React from 'react';
import { Popconfirm } from 'antd';
    
// 表头
export default ({ onEditAddressClick, onDeleteAddressClick }: {
    onEditAddressClick: Function;
    onDeleteAddressClick: Function;
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
            title: '收货人',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '所在地区',
            dataIndex: 'region',
            key: 'region',
            align: 'center',
        },
        {
            title: '详情地址',
            dataIndex: 'detail',
            key: 'detail',
            align: 'center',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: '默认地址',
            dataIndex: 'isDefault',
            key: 'isDefault',
            align: 'center',
            render: (text, record, index) => text === 1 ? '是' : "否",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div className='operation-btn'>
                        <Popconfirm 
                            title="你确定要删除？" 
                            onConfirm={() => onDeleteAddressClick?.(record?.id)}
                        >
                            <span>删除</span>
                        </Popconfirm>
                        <span onClick={ () => onEditAddressClick?.(true, record) }>更新</span>
                    </div>
                );
            }
        }
    ];
};
