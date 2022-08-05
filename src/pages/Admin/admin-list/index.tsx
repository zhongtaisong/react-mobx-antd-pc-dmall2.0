import React from 'react';
import { Form, Button, Table, Modal } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { IFormProps } from './types';
// 添加权限 - 表单
import DrawerForm from './components/drawer-form';
// 表头
import columns from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 权限列表
 */
@observer
class List extends React.PureComponent<any, {
    /**
     * Modal是否可见
     */
    isVisible: boolean;
    /**
     * 表单信息
     */
    formInfo: {
        [key: string]: any;
    };
    /**
     * 是否禁用表单
     */
    isDisabledForm: boolean;
    /**
     * 表单属性
     */
    formProps: IFormProps;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            formInfo: {},
            isDisabledForm: false,
            formProps: {
                brandMenu: false,
                brandBtn: [],
                productMenu: false,
                productBtn: [],
                orderMenu: false,
                orderBtn: [],
                commentMenu: false,
                commentBtn: [],
                userMenu: false,
                userBtn: [],
                adminMenu: false,
                adminBtn: [],
                role: null,
            },
        }
    }

    componentDidMount() {
        state.selectDataFn({
            current: 1,
        });
    }

    render() {
        const { dataSource, total, } = state;
        const { isVisible, formInfo, isDisabledForm, formProps } = this.state;

        return (
            <div className='common_width admin_admin_list'>
                <Button 
                    className='admin_admin_list__addBtn'
                    type='primary'
                    onClick={() => {
                        this.setState({ isVisible: true });
                    }}
                >添加权限</Button>
                
                <Table 
                    columns={ 
                        columns({
                            onUpdateClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                    formProps: obj,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                            onDeleteClick: (id) => state.deleteDataFn(id),
                            onDetailClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                    isDisabledForm: true,
                                    formProps: obj,
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
                            state.selectDataFn({
                                current,
                                pageSize,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Modal
                    title={`${ formInfo?.id ? '更新' : '添加' }权限`}
                    visible={ isVisible }
                    okText="保存"
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                    wrapClassName='admin_admin_list__modal'
                    bodyStyle={{ 
                        maxHeight: 400,
                        overflowY: "scroll",
                    }}
                    {...isDisabledForm ? { footer: null, } : {}}
                >
                    <Form 
                        className='admin_admin_list__modal--form'
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        autoComplete="off"
                        ref={ this.formRef }
                        disabled={ isDisabledForm }
                        onValuesChange={ this.onValuesChange }
                    >
                        <DrawerForm 
                            isDisabledEdit={ Boolean(formInfo?.id) } 
                            formProps={ formProps }
                        />
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * 监听 - 表单值变化
     */
    onValuesChange = (changedValues) => {
        const { formProps } = this.state;
        for(const key in changedValues) {
            if(key.includes('Menu')) {
                this.setState({
                    formProps: {
                        ...formProps,
                        ...changedValues,
                    },
                });
            }
        }

        if(!changedValues?.role) return;
        let params = null;
        if(changedValues?.role === '100') { // 超级管理员
            params = {
                brandMenu: true,
                brandBtn: ['1', '2', '3'],
                productMenu: true,
                productBtn: ['1', '2', '3', '5', '6'],
                orderMenu: true,
                orderBtn: ['2', '4'],
                commentMenu: true,
                commentBtn: ['1', '2', '3'],
                userMenu: true,
                userBtn: ['1', '2', '3', '4', '7'],
                adminMenu: true,
                adminBtn: ['1', '2', '3', '4'],
            };

        }else if(changedValues?.role === '10') { // 管理员
            params = {
                brandMenu: true,
                brandBtn: ['1', '3'],
                productMenu: true,
                productBtn: ['1', '3', '5', '6'],
                orderMenu: true,
                orderBtn: ['4'],
                commentMenu: true,
                commentBtn: ['1', '3'],
                userMenu: true,
                userBtn: ['1', '3', '4', '7'],
                adminMenu: true,
                adminBtn: ['1', '3', '4'],
            };

        }else {
            params = {
                brandMenu: true,
                brandBtn: [],
                productMenu: true,
                productBtn: [],
                orderMenu: true,
                orderBtn: ['4'],
                commentMenu: true,
                commentBtn: [],
                userMenu: false,
                userBtn: [],
                adminMenu: false,
                adminBtn: [],
            };

        }

        if(!params) return;
        this.setState({ 
            formProps: {
                ...params,
                ...changedValues,
            }, 
        });
        this.formRef.current.setFieldsValue({...params});
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { formInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            for(const key in values) {
                const val = values[key];
                if(typeof val === 'boolean') {
                    values[key] = Number(val);
                }
            }
            let res = null;
            if(!formInfo?.id) {
                res = state.addDataFn(values);
            }else {
                res = state.updateDataFn({
                    ...values,
                    id: formInfo?.id,
                });
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
            formInfo: {},
            isDisabledForm: false,
            formProps: {},
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default List;