import React, { Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

// 品牌列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectBrandData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectBrandData();
    }

    // 添加品牌
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加品牌');
    };

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
    };

    // 重置
    resetData = () => {
        this.props.form.resetFields();
        store.setInputContent();
    }

    // 提交
    submitData = () => {
        const { addBrandData, updateBrandData } = state;
        let { id } = store;
        this.props.form.validateFields((err, values) => {
            if ( !err ) {
                if( !id ){
                    addBrandData( values );
                }else{
                    updateBrandData( values );
                }
            }
        });
    }

    componentWillUnmount() {
        store.clearMobxTableData();
    }

    render() {
        const { 
            dataList, current, total, pageSize, drawerVisible, isDisabled, inputContent
        } = store;
        const { title } = state;
        const { getFieldDecorator } = this.props.form;
        let { brandBtn } = toJS($state.adminObj) || {};
        brandBtn = brandBtn ? JSON.parse(brandBtn) : [];
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
                    scroll={{ x: false, y: false }}
                    paginationChange={ this.pageChange }
                    addTitle='品牌'
                    addClick={ this.buttonClick }
                    isDisabledBtn={ !brandBtn.includes(1) }
                />
                <Drawer 
                    title={ title }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={ 
                        <Form>
                            <Form.Item label="品牌名称">
                                {
                                    getFieldDecorator('fname', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }],
                                        initialValue: toJS(inputContent) || null
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Form>
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

export default Form.create()(List);