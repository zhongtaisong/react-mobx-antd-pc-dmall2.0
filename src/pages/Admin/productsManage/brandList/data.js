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
        width: '6%',
        render: (text, record, index) => `${index+1}`
    },
    {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            let { brandBtn } = toJS($state.adminObj) || {};
            brandBtn = brandBtn ? JSON.parse(brandBtn) : [];
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        if( !brandBtn.includes(3) ) return;
                        store.setInputContent( record.brandName );
                        store.setDrawerVisible( true );
                        store.setId( record.id );
                        state.setTitle('修改品牌');
                    } } disabled={ !brandBtn.includes(3) } >修改</a>
                    <Popconfirm title="你确定要删除？" 
                        disabled={ !brandBtn.includes(3) }
                        onConfirm={ () => state.deleteBrandData( record.id ) }
                    >
                        <a disabled={ !brandBtn.includes(3) } >删除</a>
                    </Popconfirm>
                </div>
            );
        }
    }

];