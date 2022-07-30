import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { observer } from 'mobx-react';
import {FormInstance} from 'antd/es/form';

/**
 * 添加收货地址 - Modal
 */
@observer
class AddressModal extends React.Component<{
    /**
     * AddressModal是否可见
     */
     visible: boolean;
    /**
     * AddressModal外部入参
     */
    addressModalData: {
        id?: number;
        [key: string]: any;
    };
    /**
     * Modal - 确定操作
     */
    onOk: Function;
    /**
     * Modal - 取消操作
     */
    onCancel: Function;
}, any> {
    formRef = React.createRef<FormInstance>();

    componentDidUpdate(prevProps: Readonly<{ visible: boolean; addressModalData: { [key: string]: any; }; }>, prevState: Readonly<any>, snapshot?: any): void {
        const { visible, addressModalData, } = this.props;

        if(visible) {
            this.formRef.current.setFieldsValue({
                ...addressModalData,
            });
        }
    }

    render() {
        const { visible, addressModalData } = this.props;
        const title = typeof addressModalData?.id === 'number' ? '更新' : '添加';

        return (
            <Modal
                title={ `${ title }收货地址` }
                visible={ visible }
                onOk={ this.onOk }
                onCancel={ this.onCancel }
            >                    
                <Form 
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="off"
                    ref={ this.formRef }
                >
                    <Form.Item
                        label="收货人"
                        name="name"
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>

                    <Form.Item
                        label="所在地区"
                        name="region"
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>

                    <Form.Item
                        label="详情地址"
                        name="detail"
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>

                    <Form.Item 
                        label="联系电话"
                        name="phone"
                        required
                        rules={[{ 
                            validator: (rule, value) => {
                                if(!value?.trim?.()) {
                                    return Promise.reject('请输入联系电话！');
                                }

                                const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                                if (!reg.test(value)) {
                                    return Promise.reject('请输入合法的联系电话！');
                                }
                        
                                return Promise.resolve();
                            } 
                        }]}
                    >
                        <Input placeholder='请输入联系电话' />
                    </Form.Item>

                    <Form.Item
                        label="设为默认地址"
                        name="isDefault"
                        rules={[{ 
                            required: true, 
                            message: '必选', 
                        }]}
                    >
                        <Radio.Group>
                            <Radio value={ 1 }>是</Radio>
                            <Radio value={ 0 }>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    /**
     * AddressModal - 确定 - 操作
     */
    onOk = () => {
        const { onOk, addressModalData } = this.props;
        this.formRef.current.validateFields().then(values => {
            if(!values || !Object.keys(values).length) return;

            this.onCancel();
            onOk?.({
                ...addressModalData,
                ...values,
            })
        });
    }

    /**
     * AddressModal - 取消 - 操作
     */
    onCancel = () => {
        const { onCancel } = this.props;

        this.formRef.current.resetFields();
        onCancel?.();
    }

}

export default AddressModal;