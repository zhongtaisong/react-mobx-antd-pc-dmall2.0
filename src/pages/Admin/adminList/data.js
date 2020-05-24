import React, { Fragment } from 'react';
import { Popconfirm, Row, Col } from 'antd';
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
        width: '10%'
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        align: 'center',
        width: '10%',
        render: (text, record, index) => {
            return text == 1 ? '访客' : text == 10 ? '管理员' : text == 100 ? '超级管理员' : '无';
        }
    },
    {
        title: '品牌管理',
        dataIndex: 'brandMenu',
        key: 'brandMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.brandBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '商品管理',
        dataIndex: 'productMenu',
        key: 'productMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.productBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : current == 5 ? '上架' : current == 6 ? '下架' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '订单管理',
        dataIndex: 'orderMenu',
        key: 'orderMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.orderBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '用户管理',
        dataIndex: 'userMenu',
        key: 'userMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.userBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : current == 5 ? '重置密码' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '评论管理',
        dataIndex: 'commentMenu',
        key: 'commentMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.commentBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '权限管理',
        dataIndex: 'adminMenu',
        key: 'adminMenu',
        align: 'center',
        className: 'columns_left',
        width: '30%',
        render: (text, record, index) => {
            let btn = record.adminBtn || [];
            let str = btn.length ? btn.reduce((prev, current, index, arr) => {
                return `${prev}${ 
                    current == 1 ? '添加' : current == 2 ? '删除' : current == 3 ? '修改' : current == 4 ? '查看' : '无'
                }${index == arr.length -1 ? '' : '、'}`;
            }, '') : '无';
            return (<Row>
                <Col span={ 24 }>
                    <span>菜单状态：</span><span>（{ text == 1 ? '显示' : '隐藏' }）</span>
                </Col>
                <Col span={ 24 }>
                    <span>操作权限：</span><span>（{ str }）</span>
                </Col>
            </Row>);
        }
    },
    {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
        align: 'center',
        width: '10%',
    },
    {
        title: '操作时间',
        dataIndex: 'handleTime',
        key: 'handleTime',
        align: 'center',
        width: '20%',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            let handleUploadImgData = (rec) => {
                store.setFormData( rec );
                store.setDrawerVisible( true );
                store.setId( rec.id );
            };
            let { adminBtn, role } = toJS($state.adminObj) || {};
            adminBtn = adminBtn ? JSON.parse(adminBtn) : [];
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        if(!adminBtn.includes(4)) return;
                        handleUploadImgData( record );
                        store.setIsDisabled( true );
                        state.setTitle('查看用户权限');
                    } } disabled={ !adminBtn.includes(4) }>查看</a>
                    {
                        role != record.role && record.role != 100 ? (
                            <Fragment>
                                <a onClick={ () => {
                                    if(!adminBtn.includes(3)) return;
                                    handleUploadImgData( record );
                                    store.setIsDisabled( false );
                                    state.setTitle('修改用户权限');
                                } } disabled={ !adminBtn.includes(3) }>修改</a>
                                {
                                    role == 100 ? (
                                        <Popconfirm title="你确定要删除？" 
                                            disabled={ !adminBtn.includes(2) }
                                            onConfirm={ () => state.deleteData({
                                                id: record.id,
                                                uname: record.uname
                                            }) }
                                        >
                                            <a disabled={ !adminBtn.includes(2) }>删除</a>
                                        </Popconfirm>
                                    ) : ''
                                }
                            </Fragment>
                        ) : ''
                    }
                </div>
            );
        }
    }
];