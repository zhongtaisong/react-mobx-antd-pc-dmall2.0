import React from 'react';
import { Popconfirm } from 'antd';
import { toJS } from 'mobx';
// 公共数据
import { store } from '@pages/Admin/components';
// 数据
import state from './state';
// 全局公共方法
import { session } from '@utils';
// url前缀
import { PUBLIC_URL } from '@config';
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
        width: '6%',
        render: (text, record, index) => `${index+1}`
    },
    // {
    //     title: '品牌',
    //     dataIndex: 'brandId',
    //     key: 'brandId',
    //     ellipsis: true,
    //     render: (text, record, index) => text && tableDic.BRAND_LIST ? tableDic.BRAND_LIST[text] : null
    // },
    // {
    //     title: '商品名称',
    //     dataIndex: 'productName',
    //     key: 'productName',
    //     ellipsis: true
    // },
    {
        title: '商品描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        ellipsis: true,
        width: '20%'
    },
    // {
    //     title: '促销文案',
    //     dataIndex: 'copywriting',
    //     key: 'copywriting',
    //     ellipsis: true,
    //     width: '20%'
    // },
    // {
    //     title: '价格（元）',
    //     dataIndex: 'price',
    //     key: 'price',
    //     ellipsis: true,
    //     render: (text, record, index) => Number(text).toFixed(2),
    //     width: '16%'
    // },
    {
        title: '上架时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        ellipsis: true,
        width: '16%'
    },
    {
        title: '下架时间',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
        ellipsis: true,
        width: '16%'
    },
    {
        title: '热门推荐',
        dataIndex: 'hot',
        key: 'hot',
        align: 'center',
        width: '10%',
        render: (text, record, index) => text && text == 101 ? '是' : '否'
    },
    {
        title: '单品推广',
        dataIndex: 'single',
        key: 'single',
        align: 'center',
        width: '10%',
        render: (text, record, index) => text && text == 102 ? '是' : '否'
    },
    {
        title: 'banner推广',
        dataIndex: 'banner',
        key: 'banner',
        align: 'center',
        width: '12%',
        render: (text, record, index) => text && text == 103 ? '是' : '否'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '188px',
        render: (text, record, index) => {
            const pub = (rec) => {
                state.setBasicInfoData( rec );
                state.setProductAttributesData( rec );
                state.setPushProductsData( rec );
                store.setDrawerVisible( true );
                let fileListArr = [{
                    uid: Date.now(),
                    name: 'img.png',
                    status: 'done',
                    url: PUBLIC_URL + record.mainPicture
                }];
                let pictures = record.pictures ? record.pictures.split('|') : [];
                pictures.forEach((item, inx) => {
                    fileListArr.push({
                        uid: Date.now() + inx + 1,
                        name: 'img.png',
                        status: 'done',
                        url: PUBLIC_URL + item
                    });
                });
                state.setFileListArr( fileListArr );

                let fileListDetailsArr = [];
                let detailsPic = record.detailsPic ? record.detailsPic.split('|') : [];
                detailsPic.forEach((item, inx) => {
                    fileListDetailsArr.push({
                        uid: Date.now() + inx + 1,
                        name: 'img.png',
                        status: 'done',
                        url: PUBLIC_URL + item
                    });
                });
                state.setFileListDetailsArr( fileListDetailsArr );

                let bannerFileList = [];
                let bannerPic = record.bannerPic ? record.bannerPic.split('|') : [];
                bannerPic.forEach((item, inx) => {
                    bannerFileList.push({
                        uid: Date.now() + inx + 1,
                        name: 'img.png',
                        status: 'done',
                        url: PUBLIC_URL + item
                    });
                });
                state.setBannerFileList( bannerFileList );

                if( record.banner == 103 ){
                    state.setIsUpload(true);
                }else if( record.banner == 13 ){
                    state.setIsUpload(false);
                }

                store.setId( rec.id );
            };
            let { productBtn } = toJS($state.adminObj) || {};
            productBtn = productBtn ? JSON.parse(productBtn) : [];
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        if(!productBtn.includes(4)) return;
                        pub( record );
                        store.setIsDisabled( true );
                        state.setTitle('查看商品');
                    } } disabled={ !productBtn.includes(4) }>查看</a>
                    <a onClick={ () => {
                        if(!productBtn.includes(3)) return;
                        pub( record );
                        state.setTitle('修改商品');
                    } } disabled={ !productBtn.includes(3) }>修改</a>
                    <Popconfirm title="你确定要删除？" 
                        disabled={ !productBtn.includes(2) }
                        onConfirm={ () => state.deleteProductsData({
                            id: record.id,
                            mainPicture: record.mainPicture,
                            pictures: record.pictures,
                            detailsPic: record.detailsPic,
                            bannerPic: record.bannerPic
                        }) }
                    >
                        <a disabled={ !productBtn.includes(3) }>删除</a>
                    </Popconfirm>
                    <a 
                        onClick={ () => {
                            if( (record.onLine == 10 && !productBtn.includes(5)) || (record.onLine == 100 && !productBtn.includes(6)) ) return;
                            state.pushData(record.id, record.onLine);
                        } }
                        // style={ record.onLine == 10 ? { color: '#1890FF' } : record.onLine == 100 ? { color: 'red' } : null }
                        disabled={ (record.onLine == 10 && !productBtn.includes(5)) || (record.onLine == 100 && !productBtn.includes(6)) }
                    >
                        { record.onLine == 10 ? '上架' : record.onLine == 100 ? '下架' : record.onLine }
                    </a>
                </div>
            );
        }
    }
];