import React from 'react';
import { Form, Input } from 'antd';
/**
 * 登录密码
 */
class LoginPassword extends React.PureComponent<any, any> {
    render() {
        return (
            <>
                <Form.Item
                    label="旧密码"
                    name="oldUpwd"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="newUpwd"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="确认新密码"
                    name="confirmNewUpwd"
                    rules={[({ getFieldValue }) => ({
                        validator(_, value) {
                            value = value?.trim?.();
                            if(!value) {
                                return Promise.reject("请输入确认新密码！");
                            };

                            if (getFieldValue('newUpwd') !== value) {
                                return Promise.reject("两次输入的密码不一致！");
                            }

                            return Promise.resolve();
                        },
                    })]}
                    dependencies={['newUpwd']}
                >
                    <Input placeholder='请输入' />
                </Form.Item>
            </>
        );
    }
}

export default LoginPassword;