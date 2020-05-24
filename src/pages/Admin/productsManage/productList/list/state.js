import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 抽屉 - 标题
    @observable title = '添加商品';
    @action setTitle = (data = '添加商品') => {
        this.title = data;
    }

// -------------------- 基本信息 -------------------------- //
    // form
    @observable biForm = {};
    @action setBiForm = (data = {}) => {
        this.biForm = data;
    }

    // 基本信息 - 数据
    @observable basicInfoData = {};
    @action setBasicInfoData = (data = {}) => {
        this.basicInfoData = data;
    }
// -------------------- 基本信息 -------------------------- //

// -------------------- 商品属性 -------------------------- //
    // form
    @observable paForm = {};
    @action setPaForm = (data = {}) => {
        this.paForm = data;
    }

    // 商品属性 - 数据
    @observable productAttributesData = {};
    @action setProductAttributesData = (data = {}) => {
        this.productAttributesData = data;
    }
// -------------------- 商品属性 -------------------------- //

// -------------------- 上传商品图片 -------------------------- //
    // 上传商品图片 - 数据
    @observable fileListArr = [];
    @action setFileListArr = (data = []) => {
        this.fileListArr = data;
    }

    // 存储被删商品图片 - 数据
    @observable delList = [];
    @action setDelList = (data = []) => {
        this.delList = data;
    }
// -------------------- 上传商品图片 -------------------------- //

// -------------------- 上传商品详情图片 -------------------------- //
    // 上传商品详情图片 - 数据
    @observable fileListDetailsArr = [];
    @action setFileListDetailsArr = (data = []) => {
        this.fileListDetailsArr = data;
    }

    // 存储被删上传商品详情图片 - 数据
    @observable delDetailsList = [];
    @action setDelDetailsList = (data = []) => {
        this.delDetailsList = data;
    }
// -------------------- 上传商品详情图片 -------------------------- //

// -------------------- 推广商品 -------------------------- //
    // form
    @observable pushForm = {};
    @action setPushForm = (data = {}) => {
        this.pushForm = data;
    }

    // 推广 - 数据
    @observable pushProductsData = {};
    @action setPushProductsData = (data = {}) => {
        this.pushProductsData = data;
    }

    // 是否展示banner上传组件
    @observable isUpload = false;    
    @action setIsUpload = (data = false) => {
        this.isUpload = data;
    }
    // banner图片 - 数据
    @observable bannerFileList = [];
    @action setBannerFileList = (data = []) => {
        this.bannerFileList = data;
    }

    // 存储被删banner图片 - 数据
    @observable delBannerList = [];
    @action setDelBannerList = (data = []) => {
        this.delBannerList = data;
    }
// -------------------- 推广商品 -------------------------- //

    // 查询所有商品 - 发起请求
    selectProductsData = async () => {
        const res = await service.selectProductsData({
            current: store.current,
            pageSize: store.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data || {};
                products.map((item, index) => {
                    return item['key'] = index + 1;
                });
                store.setDataList( products );
                store.setCurrent( current );
                store.setPageSize( pageSize );
                store.setTotal( total );
                // 清除抽屉内部数据
                store.clearMobxData();
                this.clearMobxData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 添加商品 - 发起请求
    addProductsData = async (values = {}) => {
        const res = await service.addProductsData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除商品 - 发起请求
    deleteProductsData = async (values = {}) => {
        const res = await service.deleteProductsData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改商品 - 发起请求
    updateProductsData = async (values = {}) => {
        const res = await service.updateProductsData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsData();          
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 上架 / 下架
    pushData = async (id, code) => {
        const res = await service.pushData({
            id, code
        });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setTitle();
        this.setBiForm();
        this.setBasicInfoData();
        this.setPaForm();
        this.setProductAttributesData();
        this.setFileListArr();
        this.setDelList();
        this.setFileListDetailsArr();
        this.setDelDetailsList();
        this.setPushForm();
        this.setPushProductsData();
        this.setIsUpload();
        this.setBannerFileList();
        this.setDelBannerList();
    }

}

export default new State();