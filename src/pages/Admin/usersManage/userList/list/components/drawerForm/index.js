import React from 'react';
import { Form, Row, Col, Input, Button, Select, Radio, DatePicker } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共方法
import { formUtils } from '@utils';
// 全局公共组件
import { UploadImg } from '@com';

const onFieldsChange = (props, changedFields) => {
    props.setFormData({...props.formData, ...formUtils.formToMobx(changedFields)});
};

const mapPropsToFields = (props) => {
    if( props.formData ){
        return formUtils.mobxToForm({...props.formData});
    }
};

// 抽屉内容
@observer
class DrawerForm extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm( this.props.form );
    }

    // 手机号码 - 校验
    validatePhone = (rule, value, callback) => {
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        if ( !reg.test( value ) ) {
            callback('请输入合法的手机号码！');
        } else {
            callback();
        }
    };

    render() {
        let {
            form: { getFieldDecorator },
            isDisabled, id, 
            state: { setFileListArr, fileListArr, delList, setDelList }
        } = this.props;
        if( isDisabled ){
            getFieldDecorator = (...rest) => {
                return element => {
                    let newElement = React.cloneElement(element, {
                        disabled: true
                    });
                    return this.props.form.getFieldDecorator(...rest)(newElement);
                };
            };
        }
        return (
            <Form layout='inline' className='drawer_form'>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item label="用户名">
                            {
                                getFieldDecorator('uname', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Input placeholder='请输入' disabled={ !!id } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    {
                        !id ? (
                            <Col span={ 24 }>
                                <Form.Item label="密码">
                                    {
                                        getFieldDecorator('upwd', {
                                            rules: [{ 
                                                required: true,
                                                whitespace: true,
                                                message: '必填' 
                                            }]
                                        }
                                        )(
                                            <Input type='password' placeholder='请输入' />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        ) : ''
                    }
                    <Col span={ 24 }>
                        <Form.Item label="邮箱">
                            {
                                getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email',
                                        message: '输入的邮箱无效!',
                                    },{
                                        required: true,
                                        message: '必填', 
                                        whitespace: true 
                                    }]
                                })(
                                    <Input placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="手机号码">
                            {
                                getFieldDecorator('phone', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    },{
                                        validator: this.validatePhone
                                    }]
                                }
                                )(
                                    <Input placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="头像" style={{ padding: '4px 0' }}>
                            {/* 上传头像 */}
                            {
                                !isDisabled ? (
                                    <UploadImg 
                                        downloadUrl='products/download'
                                        fileNum={ 1 }
                                        setFileListArr={ setFileListArr }
                                        fileListArr={ fileListArr }
                                        disabled={ isDisabled }
                                        delList={ toJS( delList ) }
                                        setDelList={ setDelList }
                                        uploadText='点击上传'
                                    />
                                ) : '-'
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="性别" className='radios'>
                            {
                                getFieldDecorator('gender', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Radio.Group>
                                        <Radio value='0'>男</Radio>
                                        <Radio value='1'>女</Radio>
                                        <Radio value='2'>保密</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="生日">
                            {
                                getFieldDecorator('birthday', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <DatePicker />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="昵称">
                            {
                                getFieldDecorator('nickName', {
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
            </Form>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(DrawerForm);