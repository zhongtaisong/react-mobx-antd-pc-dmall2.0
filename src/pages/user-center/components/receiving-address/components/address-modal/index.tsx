import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { observer } from 'mobx-react';
// 数据
import state from './../../state';

/**
 * 添加收货地址 - Modal
 */
@observer
class AddressModal extends React.Component<{
    /**
     * Modal是否可见
     */
    visible: boolean;
}, any> {
    render() {
        const { visible } = this.props;

        return (
            <Modal
                width={ 800 }
                title="添加收货地址"
                visible={ visible }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                destroyOnClose={ true }
                className='dm_ReceivingAddress_modal'
            >                    
                <Form 
                    layout='inline'
                    autoComplete='off'
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
                            message: '必填', 
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

    // 确定
    handleOk = () => {
        const [ form ] = Form.useForm();
        form.validateFields().then(values => {
            state.editAddressData(values);
            this.handleCancel();
        });
    }

    // 取消
    handleCancel = () => {
        state.setVisible( false );
        state.setAddressModalData();
    }
}

export default AddressModal;