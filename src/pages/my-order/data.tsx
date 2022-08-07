import React from 'react';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';

export const columns = [
    {
        title: '主图',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text) => <img style={{ width: '100%', }} src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品详情',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        width: '34%',
        render: (text, record) => {
            return (
                <Link 
                    className='dm_MyOrder__columns--description' 
                    to={ `/views/products/detail/${ record?.id }` }
                >
                    <span className='two_line_ellipsis' title={ text }>{ text }</span>
                    <span className='single_line_ellipsis'>规格：{ record?.spec }</span>
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
        render: (text) => `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`,
    },
    {
        title: '数量',
        dataIndex: 'buyCount',
        key: 'buyCount',
        align: 'center',
        width: '14%',
        render: (text) => `x ${text}`
    },
    {
        title: '小计',
        dataIndex: 'totalprice',
        key: 'totalprice',
        align: 'center',
        width: '16%',
        render: (text) => `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '148px',
        render: (text, record) => {
            return (              
                <div className='operation-btn'>
                    <Link 
                        to={{ 
                            pathname: '/views/products/cart/evaluate', 
                            state: { id: record?.id },
                        }}
                    >评价</Link>
                    <Link 
                        to={{ 
                            pathname: '/views/products/cart/orderDetails', 
                            state: { id: record?.orderId },
                        }}
                    >详情</Link>
                </div>
            );
        }
    }
];