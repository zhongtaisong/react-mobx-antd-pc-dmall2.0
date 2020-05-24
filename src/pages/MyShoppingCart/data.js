import React from 'react';
import { InputNumber, Popconfirm, Icon } from 'antd';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';

export const columns = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text, record, index) => <img className='imgs_style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        width: '44%',
        render: (text, record, index) => {
            return (
                <Link className='title_style' to={'/views/products/detail/' + record.id}>
                    <span title={ text }>{ text }</span>
                    <span className='ellipsis'>规格：{ record.spec }</span>
                </Link>
            );
        }
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '16%',
        render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        width: '14%',
        render: (text, record, index) => {
            return (
                <InputNumber min={ 1 } max={ 99 } defaultValue={ text } precision={ 0 } onChange={ (value) => {
                    let totalPrice = parseFloat( record.price ) * value;
                    state.updatecartData(record.id, value, totalPrice);
                    state.setPriceList02(index, 'totalP', [value, totalPrice]);
                } } />
            );
        }
    },
    {
        title: '小计',
        dataIndex: 'totalprice',
        key: 'totalprice',
        align: 'center',
        width: '16%',
        render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        // fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            return (              
                <div className='operation'>
                    <Popconfirm
                        title="你确定要删除这条数据？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => {
                            state.delcartData( [record.id] );
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <span>删除</span>
                    </Popconfirm>
                    <span onClick={() => {
                        state.addcolsData( [ record.id ], [ record ] );
                    }}>加入收藏</span>
                </div>
            );
        }
    }
];