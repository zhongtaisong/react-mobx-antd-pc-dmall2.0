import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { observer } from 'mobx-react';

// 新密码
@observer
class NewPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    // 密码 - 校验
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if ( value && this.state.confirmDirty ) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // 确认密码 - 校验
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if ( value && value !== form.getFieldValue('uPwd') ) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    };

    // 确认密码
    handleConfirmBlur = (e) => {
        const { value } = e.target;
        this.setState({ 
            confirmDirty: !!value
        });
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
                        <Form.Item label="密码" hasFeedback>
                            {
                                getFieldDecorator('uPwd', {
                                    rules: [{
                                        required: true,
                                        message: '必填', 
                                        whitespace: true 
                                    },{
                                        validator: this.validateToNextPassword
                                    }]
                                })(
                                    <Input.Password placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="确认密码" hasFeedback>
                            {
                                getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true,
                                        message: '必填', 
                                        whitespace: true 
                                    },{
                                        validator: this.compareToFirstPassword
                                    }]
                                })(
                                    <Input.Password placeholder='请输入' onBlur={ this.handleConfirmBlur } />
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='password-operation'>
                    <Col span={ 24 }>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" style={{ width: '100%' }} onClick={ handleTarget.bind(this, 'submit') }>提交新密码</Button>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item>
                            <a  onClick={ handleTarget }>直接登录</a>
                        </Form.Item>            
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default NewPassword;