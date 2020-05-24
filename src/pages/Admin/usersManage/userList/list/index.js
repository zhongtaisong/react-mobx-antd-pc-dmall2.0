import React, { Fragment } from 'react';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 设置
import { PWD_KEY } from '@config';
// 添加用户 - 表单
import DrawerForm from './components/drawerForm';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

// 用户列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectUsersData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectUsersData();
    }

    // 添加用户
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加用户');
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
            store.form.resetFields(['upwd', 'email', 'phone', 'gender', 'birthday', 'nickName']);
        }
        store.setFileListObj();
    }

    // 提交
    submitData = () => {
        let { addUsersData, updateUsersData } = state;
        let { form, id } = store;
        let { fileListArr, delList } = state;
        fileListArr = toJS( fileListArr );
        form.validateFields((err, values) => {
            if ( !err ) {
                let formData = new FormData();
                values['birthday'] = values['birthday'] ? moment( values['birthday'] ).format('YYYY-MM-DD') : null;

                fileListArr.forEach((item, index) => {
                    if( item.originFileObj ){
                        formData.append(`avatar`, item.originFileObj);
                    }else if( item.url ){
                        let url = item.url.slice(item.url.indexOf('api/') + 4);
                        formData.append(`avatar`, url);
                    }
                });

                values.upwd = values.upwd ? this.$md5( values.upwd + PWD_KEY ) : null;
                formData.append('userInfo', JSON.stringify(values));
                if( !id ){
                    addUsersData( formData );
                }else{
                    formData.append('uname', values['uname']);
                    formData.append('delList', JSON.stringify(delList));
                    updateUsersData( formData );
                }
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
            setFormData, isDisabled, id
        } = store;
        const { title } = state;
        let { userBtn } = toJS($state.adminObj) || {};
        userBtn = userBtn ? JSON.parse(userBtn) : [];
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
                    rowKey='key'
                    scroll={{ x: '130%', y: false }}
                    paginationChange={ this.pageChange }    
                    addTitle='用户'
                    addClick={ this.buttonClick }      
                    isDisabledBtn={ !userBtn.includes(1) }         
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
                            id={ toJS(id) }                         
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

export default List;