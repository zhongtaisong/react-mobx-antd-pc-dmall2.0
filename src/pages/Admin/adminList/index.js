import React, { Fragment } from 'react';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 添加用户权限 - 表单
import DrawerForm from './components/drawerForm';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 用户权限列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectData();
    }

    // 添加用户权限
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加用户权限');
    };

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
        state.clearMobxData();
    };

    // 重置
    resetData = () => {
        let { id } = store;
        if( !id ){
            store.form.resetFields();
        }else{
            store.form.resetFields(['role', 'brandMenu', 'brandBtn', 'productMenu', 'adminBtn', 'orderMenu', 'orderBtn', 'userMenu', , 'userBtn', 'commentMenu', 'commentBtn', 'adminMenu', 'adminBtn']);
        }
    }

    // 提交
    submitData = () => {
        let { editData } = state;
        let { form, formData, id } = store;
        formData = toJS(formData);
        form.validateFields((err, values) => {
            if ( !err ) {
                Object.keys(values).forEach(item => {
                    if( item.includes('Btn') ){
                        values[item] = values[item] || [];
                    }
                    if( item.includes('Menu') ){
                        values[item] = values[item] || false;
                    }
                });
                editData({ 
                    ...values, 
                    operator: sessionStorage.getItem('uname'),
                    id 
                });
            }
        });
    }

    componentWillUnmount() {
        store.clearMobxTableData();
        state.clearMobxData();
    }

    render() {
        const { 
            dataList, current, total, pageSize, drawerVisible, setForm, formData, 
            setFormData, setFormData02, isDisabled, id
        } = store;
        const { title } = state;
        let { adminBtn } = toJS($state.adminObj) || {};
        adminBtn = adminBtn ? JSON.parse(adminBtn) : [];
        const unameArr = dataList.map(item => item.uname );
        return (
            <div className='common_width common_bg dm_admin_adminList' style={{
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
                    scroll={{ x: '236%', y: false }}
                    paginationChange={ this.pageChange }    
                    addTitle='用户权限'
                    addClick={ this.buttonClick }      
                    isDisabledBtn={ !adminBtn.includes(1) }          
                />
                <Drawer 
                    title={ title }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={ 
                        <DrawerForm 
                            setForm={ setForm }
                            formData={ toJS( formData ) }
                            setFormData={ setFormData }
                            setFormData02={ setFormData02 }
                            id={ toJS(id) }                         
                            state={ state }
                            isDisabled={ isDisabled }
                            unameArr={ unameArr }
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

export default List;