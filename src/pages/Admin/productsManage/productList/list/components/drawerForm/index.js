import React from 'react';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 基本信息
import BasicInfo from './../components/basicInfo';
// 商品属性
import ProductAttributes from './../components/productAttributes';
// 上传商品图片
import UploadProductsImg from './../components/uploadProductsImg';
// 上传商品详情图片
import UploadDetailsImg from './../components/uploadDetailsImg';
// 推广商品
import PushProducts from './../components/pushProducts';
const { Panel } = Collapse;

// 抽屉内容
@observer
class DrawerForm extends React.Component {
    render() {
        let { 
            isDisabled,
            state: { 
                basicInfoData, setBasicInfoData, setBiForm, productAttributesData, setProductAttributesData, setPaForm,
                fileListArr, setFileListArr, delList, setDelList, fileListDetailsArr, setFileListDetailsArr, delDetailsList, 
                setDelDetailsList, setPushForm, pushProductsData, setPushProductsData, bannerFileList, setBannerFileList,
                delBannerList, setDelBannerList, isUpload, setIsUpload
            }
        } = this.props;
        return (
            <Collapse defaultActiveKey={ ['1', '2', '3', '4', '5'] }>
                <Panel header="基本信息" key="1" forceRender={ true }>
                    <BasicInfo 
                        formData={ toJS(basicInfoData) }
                        setFormData={ setBasicInfoData }
                        setForm={ setBiForm }
                        isDisabled={ isDisabled }
                    />
                </Panel>
                <Panel header="商品属性" key="2" forceRender={ true }>
                    <ProductAttributes 
                        formData={ toJS(productAttributesData) }
                        setFormData={ setProductAttributesData }
                        setForm={ setPaForm }
                        isDisabled={ isDisabled }
                    />
                </Panel>
                <Panel header="上传商品图片" key="3">
                    <UploadProductsImg 
                        fileListArr={ toJS(fileListArr) }
                        setFileListArr={ setFileListArr }
                        delList={ toJS(delList) }
                        setDelList={ setDelList }
                        isDisabled={ isDisabled }
                    />
                </Panel>
                <Panel header="上传商品详情图片" key="4">
                    <UploadDetailsImg 
                        fileListArr={ toJS(fileListDetailsArr) }
                        setFileListArr={ setFileListDetailsArr }
                        delList={ toJS(delDetailsList) }
                        setDelList={ setDelDetailsList }
                        isDisabled={ isDisabled }
                    />
                </Panel>
                <Panel header="推广商品" key="5">
                    <PushProducts 
                        formData={ toJS(pushProductsData) }
                        setFormData={ setPushProductsData }
                        setForm={ setPushForm }
                        fileListArr={ toJS(bannerFileList) }
                        setFileListArr={ setBannerFileList }
                        delList={ toJS(delBannerList) }
                        setDelList={ setDelBannerList }
                        isDisabled={ isDisabled }
                        isUpload={ isUpload }
                        setIsUpload={ setIsUpload }
                    />
                </Panel>
            </Collapse>
        );
    }
}

export default DrawerForm;