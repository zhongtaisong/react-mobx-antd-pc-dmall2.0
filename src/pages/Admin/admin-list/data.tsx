import React from 'react';
import { Popconfirm } from 'antd';

/**
 * 用户角色
 */
export const USER_ROLE = {
    1: "访客",
    10: "管理员",
    100: "超级管理员",
};

/**
 * 操作按钮
 */
export const OPERATION_BTN = {
    1: "添加",
    2: "删除",
    3: "修改",
    4: "查看",
    5: "上架",
    6: "下架",
    7: "重置密码",
};
   
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
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            render: (text, record, index) => USER_ROLE?.[text] || "-",
        },
        {
            title: '品牌管理',
            dataIndex: 'brandMenu',
            key: 'brandMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.brandMenu || "-" }</li>
                        <li>操作权限：{ record?.brandBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '商品管理',
            dataIndex: 'productMenu',
            key: 'productMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.productMenu || "-" }</li>
                        <li>操作权限：{ record?.productBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '订单管理',
            dataIndex: 'orderMenu',
            key: 'orderMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.orderMenu || "-" }</li>
                        <li>操作权限：{ record?.orderBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '用户管理',
            dataIndex: 'userMenu',
            key: 'userMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.userMenu || "-" }</li>
                        <li>操作权限：{ record?.userBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '评论管理',
            dataIndex: 'commentMenu',
            key: 'commentMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.commentMenu || "-" }</li>
                        <li>操作权限：{ record?.commentBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '权限管理',
            dataIndex: 'adminMenu',
            key: 'adminMenu',
            render: (text, record, index) => {
                return (
                    <ul>
                        <li>菜单状态：{ record?.adminMenu || "-" }</li>
                        <li>操作权限：{ record?.adminBtn || "-" }</li>
                    </ul>
                );
            }
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '操作时间',
            dataIndex: 'handleTime',
            key: 'handleTime',
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