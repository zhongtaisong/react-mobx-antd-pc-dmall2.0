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
        width: '10%',
        ellipsis: true
    },
    {
        title: '商品编号',
        dataIndex: 'pid',
        key: 'pid',
        align: 'center',
        width: '10%'
    },
    {
        title: '评论内容',
        dataIndex: 'content',
        key: 'content',
        align: 'center',
        // width: '54%',
        ellipsis: true
    },
    {
        title: '评论时间',
        dataIndex: 'commentTime',
        key: 'commentTime',
        align: 'center',
        width: '20%'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            const pub = (rec) => {
                store.setFormData( rec );
                store.setDrawerVisible( true );
            };
            let { commentBtn } = toJS($state.adminObj) || {};
            commentBtn = commentBtn ? JSON.parse(commentBtn) : [];
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        if(!commentBtn.includes(4)) return;
                        pub( record );
                        store.setIsDisabled( true );
                        state.setTitle('查看评论');
                    } } disabled={ !commentBtn.includes(4) }>查看</a>
                    <a onClick={ () => {
                        if(!commentBtn.includes(3)) return;
                        pub( record );
                        store.setId( record.id );
                        state.setTitle('修改评论');
                    } } disabled={ !commentBtn.includes(3) }>修改</a>
                    <Popconfirm title="你确定要删除？" 
                        disabled={ !commentBtn.includes(2) }
                        onConfirm={ () => state.deleteCommentData( record.id ) }
                    >
                        <a disabled={ !commentBtn.includes(2) }>删除</a>
                    </Popconfirm>
                </div>
            );
        }
    }
];