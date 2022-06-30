import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { observer } from 'mobx-react';

// 忘记密码
@observer
class ForgetPassword extends React.Component {

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
        const {
            form: { getFieldDecorator },
            handleTarget
        } = this.props;
        return (
            <Form layout='inline' className='dm_ForgetPassword'>
                <Row>
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
                        <Form.Item label='用户名'>
                            {
                                getFieldDecorator('uName', {
                                    rules: [{ 
                                        required: true, 
                                        message: '必填', 
                                        whitespace: true 
                                    }],
                                    initialValue: localStorage.getItem('uname')
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
                                        message: '必填', 
                                        whitespace: true 
                                    },{
                                        validator: this.validatePhone
                                    }]
                                })(
                                    <Input style={{ width: '100%' }} placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='password-operation'>
                    <Col span={ 24 }>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" style={{ width: '100%' }} onClick={ handleTarget.bind(this, 'newPwd') }>验证信息</Button>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item>
                            <a  onClick={ handleTarget.bind(this, 'login') }>直接登录</a>
                        </Form.Item>            
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ForgetPassword;