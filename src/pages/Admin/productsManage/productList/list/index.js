import React, { Fragment } from 'react';
import { Button, message } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 添加商品 - 表单
import DrawerForm from './components/drawerForm';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

// 商品列表
@observer
class Index extends React.Component {

    componentDidMount() {
        state.selectProductsData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectProductsData();
    }

    // 添加商品
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加商品');
    };

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
        state.clearMobxData();
    };

    // 重置
    resetData = () => {
        let { 
            setBasicInfoData, setProductAttributesData, setFileListArr, setDelList, setFileListDetailsArr, setDelDetailsList, setPushProductsData, 
            setIsUpload, setBannerFileList, setDelBannerList
        } = state;
        setBasicInfoData();
        setProductAttributesData();
        setFileListArr();
        setDelList();
        setFileListDetailsArr();
        setDelDetailsList();
        setPushProductsData();
        setIsUpload();
        setBannerFileList();
        setDelBannerList();
    }

    // 提交
    submitData = async () => {
        let { 
            biForm, paForm, fileListArr, fileListDetailsArr, addProductsData, updateProductsData, delList, delDetailsList,
            pushForm, bannerFileList, delBannerList
        } = state;
        const { id } = store;
        fileListArr = toJS(fileListArr);
        fileListDetailsArr = toJS(fileListDetailsArr);
        bannerFileList = toJS(bannerFileList);
        let formData = new FormData();
        let inputData = {};
        await new Promise((resolve, reject) => {
            if( biForm.validateFields ){
                biForm.validateFields((err, values) => {
                    if ( !err ) {
                        inputData = { ...values };
                        resolve();
                    }else{
                        message.error('基本信息，带*是必填项！');
                    }
                });
            }else{
                message.error('基本信息，带*是必填项！');
            }
        });
        await new Promise((resolve, reject) => {
            if( paForm.validateFields ){
                paForm.validateFields((err, values) => {
                    if ( !err ) {
                        inputData = { ...inputData, ...values };
                        resolve();
                    }else{
                        message.error('商品属性，带*是必填项！');
                    }
                });
            }else{
                message.error('商品属性，带*是必填项！');
            }
        });
        await new Promise((resolve, reject) => {
            if( !fileListArr.length ){
                message.error('商品图片，必传项！');
            }else{
                fileListArr.forEach((item, index) => {
                    if( item.originFileObj ){
                        formData.append(`pImg${index}`, item.originFileObj);
                    }else if( item.url ){
                        let url = item.url.slice(item.url.indexOf('api/') + 4);
                        formData.append(`pImg${index}`, url);
                    }
                });
                resolve();
            }
        });
        await new Promise((resolve, reject) => {
            if( !fileListDetailsArr.length ){
                message.error('上传商品详情图片，必传项！');
            }else{
                fileListDetailsArr.forEach((item, index) => {
                    if( item.originFileObj ){
                        formData.append(`pDetailsImg${index}`, item.originFileObj);
                    }else if( item.url ){
                        let url = item.url.slice(item.url.indexOf('api/') + 4);
                        formData.append(`pDetailsImg${index}`, url);
                    }
                });
                resolve();
            }
        });
        let isUpload = false;
        await new Promise((resolve, reject) => {
            if( pushForm.validateFields ){
                pushForm.validateFields((err, values) => {
                    if ( !err ) {
                        inputData = { ...inputData, ...values };
                        if( values.banner == 103 ){
                            isUpload = true;
                        }else{
                            isUpload = false;
                        }
                        resolve();                        
                    }else{
                        message.error('推广商品，带*是必填项！');
                    }
                });
            }else{
                message.error('推广商品，带*是必填项！');
            }
        });
        await new Promise((resolve, reject) => {
            if( isUpload ){
                if( !bannerFileList.length ){
                    message.error('上传商品banner图片，必传项！');
                }else{
                    bannerFileList.forEach((item, index) => {
                        if( item.originFileObj ){
                            formData.append(`bannerImg${index}`, item.originFileObj);
                        }else if( item.url ){
                            let url = item.url.slice(item.url.indexOf('api/') + 4);
                            formData.append(`bannerImg${index}`, url);
                        }
                    });
                    resolve();
                }
            }else{
                if( bannerFileList.length ){
                    delBannerList = bannerFileList[0] && bannerFileList[0].url ? [ bannerFileList[0].url.slice(bannerFileList[0].url.indexOf('api/') + 4) ] : [];
                }
                resolve();
            }
        });

        // 基本信息、商品属性、推广商品
        formData.append('inputData', JSON.stringify(inputData));
        if( !id ){
            addProductsData(formData);
        }else{
            formData.append('id', id);
            formData.append('delList', JSON.stringify(delList));
            formData.append('delDetailsList', JSON.stringify(delDetailsList));
            formData.append('delBannerList', JSON.stringify(delBannerList));
            updateProductsData(formData);
        }
    }

    componentWillUnmount() {
        store.clearMobxTableData();
        state.clearMobxData();
    }

    render() {
        const { 
            dataList, current, total, pageSize, drawerVisible, isDisabled
        } = store;
        const { title } = state;
        let { productBtn } = toJS($state.adminObj) || {};
        productBtn = productBtn ? JSON.parse(productBtn) : [];
        return (
            <div className='common_width common_bg' style={{
                padding: '10px',
                marginBottom: '42px'
            }}>
                <Table 
                    columns={ toJS(columns) }
                    dataSource={ toJS(dataList) }
                    current={ current }
                    total={ total }
                    pageSize={ pageSize }
                    rowKey='id'
                    scroll={{ x: '120%', y: false }}
                    paginationChange={ this.pageChange }
                    addTitle='商品'
                    addClick={ this.buttonClick }
                    isDisabledBtn={ !productBtn.includes(1) } 
                />
                <Drawer 
                    title={ title }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={ 
                        <DrawerForm 
                            state={ state }
                            isDisabled={ isDisabled }
                        /> 
                    }
                    btnChildren={
                        !isDisabled ? (
                            <Fragment>                            
                                <Button onClick={ this.resetData } style={{ marginRight: 8 }}>重置</Button>
                                <Button onClick={ this.submitData } type="primary">提交</Button>
                            </Fragment>
                        ) : ''
                    }
                />
            </div>
        );
    }
}

export default Index;