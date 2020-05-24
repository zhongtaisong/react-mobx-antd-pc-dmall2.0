import { observable, action, toJS } from 'mobx';

// 一页展示多少条数据
const SIZE = 6;

class State {

    // form
    @observable form = {};
    @action setForm = (data = {}) => {
        this.form = data;
    }

    // 禁止编辑
    @observable isDisabled = false;
    @action setIsDisabled = (data = false) => {
        this.isDisabled = data;
    }

    // 数据id
    @observable id = null;
    @action setId = (data = null) => {
        this.id = data;
    }

    // 抽屉 - 显示与隐藏
    @observable drawerVisible = false;
    @action setDrawerVisible = (data = false) => {
        this.drawerVisible = data;
    }

    // 表单 - 数据
    @observable formData = {};
    @action setFormData = (data = {}) => {
        this.formData = data;
    }
    @action setFormData02 = (key, value) => {
        this.formData[key] = value;
    }

    // 上传图片 - 数据
    @observable fileListObj = {};
    @action setFileListObj = (data = {}) => {
        this.fileListObj = data;
    }
    @action setFileListObj02 = (key, value) => {
        this.fileListObj[key] = value;
    }

    // 被删图片
    @observable delList = [];
    @action setDelList = (data = []) => {
        this.delList = data;
    }

    // 品牌名称 - 数据
    @observable inputContent = null;
    @action setInputContent = (data = null) => {
        this.inputContent = data;
    }

    // 品牌数据
    // @observable brand = undefined;
    // @action setBrand = (data = undefined) => {
    //     this.brand = data;
    // }

    // 商品编号
    @observable laptopId = null;
    @action setLaptopId = (data = null) => {
        this.laptopId = data;
    }

    // 卸载抽屉mobx数据
    clearMobxData = () => {
        this.setFormData();
        this.setIsDisabled();
        this.setId();
        this.setDrawerVisible();
        this.setFileListObj();
        this.setDelList();
        this.setInputContent();
        // this.setBrand();
        this.setLaptopId();
    }

// --------------------------------------------------- //
    // 当前页
    @observable current = 1;
    @action setCurrent = (data = 1) => {
        this.current = data;
    }

    // 一页多少条数据
    @observable pageSize = SIZE;
    @action setPageSize = (data = SIZE) => {
        this.pageSize = data;
    }

    // 数据总数
    @observable total = SIZE;
    @action setTotal = (data = SIZE) => {
        this.total = data;
    }

    // 列表 - 数据
    @observable dataList = [];
    @action setDataList = (data = []) => {
        this.dataList = data;
    }

    // 清除mobx中table数据
    clearMobxTableData = () => {
        this.setCurrent();
        this.setPageSize();
        this.setTotal();
        this.setDataList();
    }

}

export default new State();