import React from 'react';
import { Form, Input, Button, Table, Modal, message } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
// 基本信息
import BasicInfo from './components/basic-info';
// 商品属性
import ProductAttributes from './components/product-attributes';
// 上传商品图片
import UploadProductsImg from './components/upload-products-img';
// 上传商品详情图片
import UploadDetailsImg from './components/upload-details-img';
// 推广商品
import PushProducts from './components/push-products';
// 公共数据
import { store } from '@pages/admin/components';
// 表头
import columns from './data';
// 数据
import state from './state';
import './index.less';

/**
 * 商品列表
 */
@observer
class ProductList extends React.PureComponent<any, {
    /**
     * Modal是否可见
     */
    isVisible: boolean;
    /**
     * 商品信息
     */
    productInfo: {
        [key: string]: any;
    };
    /**
     * 是否查看商品
     */
    isGoodsDetail: boolean;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            productInfo: {},
            isGoodsDetail: false,
        }
    }

    componentDidMount() {
        state.selectProductsDataFn({
            current: 1,
        });
    }

    // 提交
    submitData = async () => {
        // let { 
        //     biForm, paForm, fileListArr, fileListDetailsArr, addProductsData, updateProductsData, delList, delDetailsList,
        //     pushForm, bannerFileList, delBannerList
        // } = state;
        // const { id } = store;
        // fileListArr = toJS(fileListArr);
        // fileListDetailsArr = toJS(fileListDetailsArr);
        // bannerFileList = toJS(bannerFileList);
        // let formData = new FormData();
        // let inputData = {};

        // await new Promise<void>((resolve, reject) => {
        //     if( !fileListArr.length ){
        //         message.error('商品图片，必传项！');
        //     }else{
        //         fileListArr.forEach((item, index) => {
        //             if( item.originFileObj ){
        //                 formData.append(`pImg${index}`, item.originFileObj);
        //             }else if( item.url ){
        //                 let url = item.url.slice(item.url.indexOf('api/') + 4);
        //                 formData.append(`pImg${index}`, url);
        //             }
        //         });
        //         resolve();
        //     }
        // });
        // await new Promise<void>((resolve, reject) => {
        //     if( !fileListDetailsArr.length ){
        //         message.error('上传商品详情图片，必传项！');
        //     }else{
        //         fileListDetailsArr.forEach((item, index) => {
        //             if( item.originFileObj ){
        //                 formData.append(`pDetailsImg${index}`, item.originFileObj);
        //             }else if( item.url ){
        //                 let url = item.url.slice(item.url.indexOf('api/') + 4);
        //                 formData.append(`pDetailsImg${index}`, url);
        //             }
        //         });
        //         resolve();
        //     }
        // });
        // let isUpload = false;
        // await new Promise<void>((resolve, reject) => {
        //     if( pushForm.validateFields ){
        //         pushForm.validateFields((err, values) => {
        //             if ( !err ) {
        //                 inputData = { ...inputData, ...values };
        //                 if( values.banner == 103 ){
        //                     isUpload = true;
        //                 }else{
        //                     isUpload = false;
        //                 }
        //                 resolve();                        
        //             }else{
        //                 message.error('推广商品，带*是必填项！');
        //             }
        //         });
        //     }else{
        //         message.error('推广商品，带*是必填项！');
        //     }
        // });
        // await new Promise<void>((resolve, reject) => {
        //     if( isUpload ){
        //         if( !bannerFileList.length ){
        //             message.error('上传商品banner图片，必传项！');
        //         }else{
        //             bannerFileList.forEach((item, index) => {
        //                 if( item.originFileObj ){
        //                     formData.append(`bannerImg${index}`, item.originFileObj);
        //                 }else if( item.url ){
        //                     let url = item.url.slice(item.url.indexOf('api/') + 4);
        //                     formData.append(`bannerImg${index}`, url);
        //                 }
        //             });
        //             resolve();
        //         }
        //     }else{
        //         if( bannerFileList.length ){
        //             delBannerList = bannerFileList[0] && bannerFileList[0].url ? [ bannerFileList[0].url.slice(bannerFileList[0].url.indexOf('api/') + 4) ] : [];
        //         }
        //         resolve();
        //     }
        // });

        // // 基本信息、商品属性、推广商品
        // formData.append('inputData', JSON.stringify(inputData));
        // if( !id ){
        //     addProductsData(formData);
        // }else{
        //     formData.append('id', id);
        //     formData.append('delList', JSON.stringify(delList));
        //     formData.append('delDetailsList', JSON.stringify(delDetailsList));
        //     formData.append('delBannerList', JSON.stringify(delBannerList));
        //     updateProductsData(formData);
        // }
    }

    render() {
        const { dataSource, total, } = state;
        const { isVisible, productInfo, isGoodsDetail } = this.state;

        return (
            <div className='common_width admin_product_list'>
                <Button 
                    className='admin_product_list__addBtn'
                    type='primary'
                    onClick={() => {
                        this.setState({ isVisible: true });
                    }}
                >添加商品</Button>

                <Table 
                    columns={ 
                        columns({
                            onPushClick: (params) => state.pushDataFn(params),
                            onUpdateClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    productInfo: obj,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                            onDeleteClick: (id) => state.deleteProductsDataFn(id),
                            onDetailClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    productInfo: obj,
                                    isGoodsDetail: true,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                        }) as any
                    }
                    dataSource={ dataSource }
                    bordered
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        total,
                        onChange(current, pageSize) {
                            state.selectProductsDataFn({
                                current,
                                pageSize,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Modal
                    title={`${ productInfo?.id ? '更新' : '添加' }商品`}
                    visible={ isVisible }
                    okText="保存"
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                    wrapClassName='admin_product_list__modal'
                    width={ 1000 }
                    bodyStyle={{ 
                        maxHeight: 400,
                        overflowY: "scroll",
                    }}
                    {...isGoodsDetail ? { footer: null, } : {}}
                >
                    <Form 
                        className='admin_product_list__modal--form'
                        layout="inline"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        autoComplete="off"
                        labelWrap
                        ref={ this.formRef }
                        disabled={ isGoodsDetail }
                    >
                        <BasicInfo />
                        <ProductAttributes />
                        <PushProducts />
                        {/* <UploadProductsImg 
                            fileListArr={ [] }
                            onUploadCallBack={(val) => {
                                this.formRef.current.setFieldsValue({
                                    goodsImg: val,
                                });
                            }}
                        />
                        <UploadDetailsImg 
                            fileListArr={ [] }
                            onUploadCallBack={(val) => {
                                this.formRef.current.setFieldsValue({
                                    goodsDetailImg: val,
                                });
                            }}
                        /> */}
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { productInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let res = null;
            const formData = new FormData();
            formData.append('inputData', JSON.stringify(values));

            if(!productInfo?.id) {
                res = state.addProductsDataFn(formData);
            }else {
                formData.append('id', productInfo?.id);
                res = state.updateProductsDataFn(formData);
            }

            if(!res) return;
            res?.then?.(bol => {
                if(!bol) return;
                this.onCancelClick();
            });
        });
    }

    /**
     * Modal - 取消 - 操作
     */
    onCancelClick = () => {
        this.setState({ 
            isVisible: false,
            productInfo: {},
            isGoodsDetail: false,
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default ProductList;