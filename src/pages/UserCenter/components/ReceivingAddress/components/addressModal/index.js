import React from 'react';
import { Modal, Form, Row, Col, Input, Radio } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils, validatePhone } from '@utils';

const onFieldsChange = (props, changedFields) => {
    props.setAddressModalData({...toJS( props.addressModalData ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.addressModalData ) ){
        return formUtils.mobxToForm({...toJS( props.addressModalData )});
    }
};

// 添加收货地址
@observer
class AddressModal extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm(this.props.form);
    }

    render() {
        const { visible, handleOk, handleCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                width={ 800 }
                title="添加收货地址"
                visible={ visible }
                onOk={ handleOk }
                onCancel={ handleCancel }
                destroyOnClose={ true }
                className='dm_ReceivingAddress_modal'
            >                    
                <Form layout='inline'>
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="收货人">
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ 
                                            required: true, 
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="所在地区">
                                {
                                    getFieldDecorator('region', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="详情地址">
                                {
                                    getFieldDecorator('detail', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="联系电话">
                                {
                                    getFieldDecorator('phone', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        },{
                                            validator: validatePhone
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 } className='radio'>
                            <Form.Item label="设为默认地址">
                                {
                                    getFieldDecorator('isDefault', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Radio.Group>
                                            <Radio value={ 1 }>是</Radio>
                                            <Radio value={ 0 }>否</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(AddressModal);