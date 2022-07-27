import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
// 设置
import { PWD_KEY } from '@config';
// 数据
import state from './state';

// 登录密码
@observer
class LoginPassword extends React.Component<any, any> {

    componentDidMount() {
        state.setHistory( this.props.history );
    }

    componentWillUnmount() {
        this.props.setLoginPassword01();
    }

    render() {

        return (
            <div className='dm_LoginPassword'>
                <Form layout="inline"
                    onFinish={(values) => {
                        values.oldUpwd = (window as any).$md5(values.oldUpwd + PWD_KEY);
                        values.newUpwd = (window as any).$md5(values.newUpwd + PWD_KEY);
                        delete values['confirmNewUpwd'];
                        state.updateUpwdData(values);
                    }}
                >
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default LoginPassword;