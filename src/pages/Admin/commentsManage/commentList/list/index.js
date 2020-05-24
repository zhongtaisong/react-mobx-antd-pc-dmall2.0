import React, { Fragment } from 'react';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
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

// 用户列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectCommentData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectCommentData();
    }

    // 添加评论
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加评论');
    };

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
    };

    // 重置
    resetData = () => {
        let { id } = store;
        if( !id ){
            store.form.resetFields();
        }else{            
            store.form.resetFields(['contents']);
        }
    }

    // 提交
    submitData = () => {
        const { addCommentData, updateCommentData } = state;
        let { form, id } = store;
        form.validateFields((err, values) => {
            if ( !err ) {
                if( !id ){
                    addCommentData({ ...values });
                }else{
                    updateCommentData({ ...values, id });
                }
            }
        });
    }

    render() {
        const { 
            dataList, current, total, pageSize, drawerVisible, setForm, formData, 
            setFormData, isDisabled, id
        } = store;
        const { title } = state;
        let { commentBtn } = toJS($state.adminObj) || {};
        commentBtn = commentBtn ? JSON.parse(commentBtn) : [];
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
                    scroll={{ x: false, y: false }}
                    paginationChange={ this.pageChange }    
                    addTitle='评论'
                    addClick={ this.buttonClick }       
                    isDisabledBtn={ !commentBtn.includes(1) }       
                />
                <Drawer 
                    title={ title }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={ 
                        drawerVisible ? (
                            <DrawerForm 
                                setForm={ setForm }
                                formData={ toJS( formData ) }
                                setFormData={ setFormData }
                                isDisabled={ isDisabled }
                                id={ toJS(id) }
                            /> 
                        ) : ''
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