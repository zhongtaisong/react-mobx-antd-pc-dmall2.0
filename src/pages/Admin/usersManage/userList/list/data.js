import React from 'react';
import { Popconfirm } from 'antd';
import moment from 'moment';
import { toJS } from 'mobx';
// 公共数据
import { store } from '@pages/Admin/components';
// 数据
import state from './state';
// url前缀
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';
// 全局数据
import $state from '@store';
const tableDic = session.getItem('tableDic');
   
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
        width: '10%'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        width: '20%',
        ellipsis: true
    },
    {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
        width: '12%'
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        width: '20%',
        ellipsis: true
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
        width: '8%',
        render: (text, record, index) => text && tableDic.GENDER ? tableDic.GENDER[text] : null
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        align: 'center',
        width: '10%'
    },
    {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
        align: 'center',
        width: '10%'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '210px',
        render: (text, record, index) => {
            let handleUploadImgData = (rec) => {
                state.setFileListArr(rec.avatar ? [{
                    uid: '-1',
                    name: 'img.png',
                    status: 'done',
                    url: PUBLIC_URL + rec.avatar
                }] : [] );
                rec['birthday'] = moment(rec['birthday']);
                store.setFormData( rec );
                store.setDrawerVisible( true );
                store.setId( rec.id );
            };
            let { userBtn } = toJS($state.adminObj) || {};
            userBtn = userBtn ? JSON.parse(userBtn) : [];
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        if( !userBtn.includes(4) ) return;
                        handleUploadImgData( record );
                        store.setIsDisabled( true );
                        state.setTitle('查看用户');
                    } } disabled={ !userBtn.includes(4) } >查看</a>
                    <a onClick={ () => {
                        if( !userBtn.includes(3) ) return;
                        handleUploadImgData( record );
                        state.setTitle('修改用户');
                    } } disabled={ !userBtn.includes(3) } >修改</a>
                    <Popconfirm title="你确定要删除？" 
                        disabled={ !userBtn.includes(2) }
                        onConfirm={ () => state.deleteUsersData( record.id, record.avatar ) }
                    >
                        <a disabled={ !userBtn.includes(2) } >删除</a>
                    </Popconfirm>
                    <Popconfirm title="你确定要重置密码？" disabled={ !userBtn.includes(5) } onConfirm={ () => state.resetUpwdData(record.id, record.ukey) }>
                        <a disabled={ !userBtn.includes(5) } >重置密码</a>
                    </Popconfirm>
                </div>
            );
        }
    }
];