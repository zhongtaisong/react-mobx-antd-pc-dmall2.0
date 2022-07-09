import React from 'react';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';

const columns = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        width: '10%',
        render: (text, record, index) => <img className='imgs-style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品',
        dataIndex: 'productName',
        key: 'productName',
        width: '60%',
        render: (text, record, index) => {
            return (
            <Link className='title_style'
                to={`/views/products/detail/${record.id}`}
            >
                <span title={ text }>{ text }</span>
                <span title={ record.description }>{ record.description }</span>
            </Link>
            );
        },
        ellipsis: true
    },
    {
        title: '规格',
        dataIndex: 'spec',
        key: 'spec',
        width: '20%',
        ellipsis: true
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
    }
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   width: '10%',
    //   render: (text, record, index) => {
    //     return (              
    //         <div className='operation'>
    //             <Link to={{
    //                 pathname: '/views/products/detail',
    //                 state: {
    //                     id: record.id
    //                 }
    //             }}>查看</Link>
    //         </div>
    //     );
    //   }
    // }
];

export { columns };