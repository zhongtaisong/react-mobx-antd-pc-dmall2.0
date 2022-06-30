import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

// 登录
@observer
class Logins extends React.Component {

    render() {
        const {
            form: { getFieldDecorator },
            handleTarget, loginSubmit
        } = this.props;
        return (
            <Form className='login'>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item>
                            {
                                getFieldDecorator('uname', {
                                    rules: [{ 
                                        required: true, 
                                        message: '必填', 
                                        whitespace: true 
                                    }],
                                    initialValue: localStorage.getItem('uname')
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item>
                            {
                                getFieldDecorator('upwd', {
                                    rules: [{ 
                                        required: true, 
                                        message: '必填', 
                                        whitespace: true 
                                    }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='password-operation'>
                    <Col span={ 12 }>
                        <Form.Item>
                            {
                                getFieldDecorator('isRemember', {
                                    rules: [{ 
                                        required: false, 
                                        message: '非必填'
                                    }]
                                })(
                                    <Checkbox.Group>
                                        <Checkbox className='isRemember' value='1'>记住密码</Checkbox>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>            
                    </Col>
                    <Col span={ 12 } style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <a onClick={ handleTarget.bind(this, 'forget') }>忘记密码？</a>
                        </Form.Item>            
                    </Col>
                </Row>
                <Row className='password-operation'>
                    <Col span={ 24 }>
                        <Form.Item>
                            <Button type="primary" style={{ width: '100%' }} onClick={ loginSubmit }>登录</Button>
                        </Form.Item>            
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item>
                            <Link to="/register">新用户注册</Link>
                        </Form.Item>            
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Logins;