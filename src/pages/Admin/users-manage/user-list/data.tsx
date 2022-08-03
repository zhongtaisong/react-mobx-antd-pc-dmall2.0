import React from 'react';
import { Popconfirm } from 'antd';
// url前缀
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';
const tableDic = session.getItem('tableDic');
   
// 表头
export default ({ onUpdateClick, onDeleteClick, onDetailClick, onResetPwdClick }: {
    /**
     * 更新操作
     */
    onUpdateClick?: Function;
    /**
     * 删除操作
     */
    onDeleteClick: Function;
    /**
     * 查看用户
     */
    onDetailClick: Function;
    /**
     * 重置用户密码
     */
    onResetPwdClick: Function;
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
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => {
                if(!text) return "-";
                
                return (
                    <div className='admin_user_list__avatar'>
                        <img src={ `${PUBLIC_URL}${ text }` } alt="avatar" />
                    </div>
                );
            },
        },
        {
            title: '用户名',
            dataIndex: 'uname',
            key: 'uname',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record, index) => tableDic?.GENDER?.[text],
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
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
                        <Popconfirm title="你确定要重置密码？" 
                            onConfirm={ () => onResetPwdClick?.({ id: record?.id, ukey: record?.ukey, }) }
                        >
                            <span>重置密码</span>
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