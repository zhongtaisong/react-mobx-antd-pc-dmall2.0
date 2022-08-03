import React from 'react';
import { Form, Button, Table, Modal, message, Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { FormInstance } from 'antd/es/form';
// 设置
import { PWD_KEY } from '@config';
// 添加用户 - 表单
import DrawerForm from './components/drawer-form';
// 公共数据
import { store } from '@pages/admin/components';
// 表头
import columns from './data';
// 数据
import state from './state';
import './index.less';

/**
 * 用户列表
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
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            formInfo: {},
            isDisabledForm: false,
        }
    }

    componentDidMount() {
        state.selectUsersDataFn({
            current: 1,
        });
    }

    render() {
        const { dataSource, total, } = state;
        const { isVisible, formInfo, isDisabledForm } = this.state;

        return (
            <div className='common_width admin_user_list'>
                <Button 
                    className='admin_user_list__addBtn'
                    type='primary'
                    onClick={() => {
                        this.setState({ isVisible: true });
                    }}
                >添加用户</Button>

                <Table 
                    columns={ 
                        columns({
                            onUpdateClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                }, () => {
                                    this.formRef.current.setFieldsValue({
                                        ...obj,
                                        birthday: moment(obj?.birthday),
                                    });
                                });
                            },
                            onDeleteClick: (id) => state.deleteUsersDataFn(id),
                            onDetailClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                    isDisabledForm: true,
                                }, () => {
                                    this.formRef.current.setFieldsValue({
                                        ...obj,
                                        birthday: moment(obj?.birthday),
                                    });
                                });
                            },
                            onResetPwdClick: (params) => state.resetUpwdDataFn(params),
                        }) as any
                    }
                    dataSource={ dataSource }
                    bordered
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        total,
                        onChange(current, pageSize) {
                            state.selectUsersDataFn({
                                current,
                                pageSize,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Modal
                    title={`${ formInfo?.id ? '更新' : '添加' }用户`}
                    visible={ isVisible }
                    okText="保存"
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                    wrapClassName='admin_user_list__modal'
                    bodyStyle={{ 
                        maxHeight: 400,
                        overflowY: "scroll",
                    }}
                    {...isDisabledForm ? { footer: null, } : {}}
                >
                    <Form 
                        className='admin_user_list__modal--form'
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        autoComplete="off"
                        ref={ this.formRef }
                        disabled={ isDisabledForm }
                    >
                        <DrawerForm 
                            fileListArr={ [] }
                            onUploadCallBack={(val) => {
                                this.formRef.current.setFieldsValue({
                                    avatar: val,
                                });
                            }}
                            isDisabledEditUname={ Boolean(formInfo?.id) }
                            renderPasswordForm={
                                !formInfo?.id ? (
                                    <Form.Item 
                                        label='密码'
                                        name="upwd"
                                        rules={[{ 
                                            required: true, 
                                            message: '必填', 
                                            whitespace: true 
                                        }]}
                                    >
                                        <Input type='password' placeholder='请输入' />
                                    </Form.Item>
                                ) : null
                            }
                        />
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { formInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            
            let res = null;
            const formData = new FormData();
            formData.append('userInfo', JSON.stringify({
                ...values,
                birthday: moment(values?.['birthday']).format('YYYY-MM-DD'),
                upwd: (window as any).$md5(values.upwd + PWD_KEY),
            }));
            
            const { avatar } = values || {};
            if(!avatar) {
                return message.error("请上传头像！");
            }else if(Array.isArray(avatar)) {
                if(!avatar.length) {
                    return message.error("请上传头像！");
                }else {
                    const { originFileObj } = avatar?.[0] || {};
                    formData.append('avatar', originFileObj || {});
                }
            }else if(typeof avatar === 'string') {
                formData.append('avatar', avatar);
            }

            if(!formInfo?.id) {
                res = state.addUsersDataFn(formData);
            }else {
                formData.append('id', formInfo?.id);
                res = state.updateUsersDataFn(formData);
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
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default List;