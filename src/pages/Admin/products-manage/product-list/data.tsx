import React from 'react';
import { Popconfirm } from 'antd';
// 全局公共方法
import { session } from '@utils';
const tableDic = session.getItem('tableDic');
   
// 表头
export default ({ onUpdateClick, onDeleteClick, onPushClick, onDetailClick }: {
    /**
     * 更新操作
     */
    onUpdateClick?: Function;
    /**
     * 删除操作
     */
    onDeleteClick: Function;
    /**
     * 操作商品
     */
    onPushClick: Function;
    /**
     * 查看商品
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
            render: (text, record, index) => `${index+1}`,
        },
        {
            title: '品牌',
            dataIndex: 'brandId',
            key: 'brandId',
            render: (text, record, index) => tableDic?.BRAND_LIST?.[text],
        },
        {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '商品描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '促销文案',
            dataIndex: 'copywriting',
            key: 'copywriting',
        },
        {
            title: '价格（元）',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) => Number(text).toFixed(2),
        },
        {
            title: '上架时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '下架时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '热门推荐',
            dataIndex: 'hot',
            key: 'hot',
            render: (text, record, index) => text === 101 ? '是' : '否'
        },
        {
            title: '单品推广',
            dataIndex: 'single',
            key: 'single',
            render: (text, record, index) => text === 102 ? '是' : '否'
        },
        {
            title: '大图推广',
            dataIndex: 'banner',
            key: 'banner',
            render: (text, record, index) => text === 103 ? '是' : '否'
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
                        {
                            [10, 100].includes(record?.onLine) ? (
                                <span onClick={() => onPushClick?.({ id: record?.id, code: record?.onLine, })} >
                                    { { 10: "上架", 100: "下架", }[record?.onLine] }
                                </span>
                            ) : null
                        }
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