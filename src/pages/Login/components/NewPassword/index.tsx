import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import './index.less';

interface IComponentProps {
    handleTarget: Function;
}

/**
 * 新密码 - 表单
 */
@observer
class NewPassword extends React.Component<IComponentProps, any> {
    render() {
        const { handleTarget } = this.props;

        return (
            <div className='dm_ForgetPassword'>
                <Form.Item 
                    label="密码" 
                    name="uPwd"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          whitespace: false,
                          message: '请输入密码！',
                        },
                    ]}
                >
                    <Input.Password placeholder='请输入密码' />
                </Form.Item>
                <Form.Item 
                    label="确认密码" 
                    name="confirm"
                    dependencies={['uPwd']}
                    required
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                value = value?.trim?.();
                                if(!value) {
                                    return Promise.reject("请输入确认密码！");
                                };

                                if (getFieldValue('uPwd') !== value) {
                                    return Promise.reject("两次输入的密码不一致！");
                                }

                                return Promise.resolve();
                            },
                        })
                    ]}
                >
                    <Input.Password placeholder='请输入确认密码' />
                </Form.Item>
                <Form.Item
                    label=" "
                    colon={ false }
                >
                    <Button 
                        type="primary" 
                        style={{ width: '100%' }} 
                        htmlType="submit"
                    >提交新密码</Button>
                </Form.Item>
                <Form.Item
                    label=" "
                    colon={ false }
                >
                    <span className='dm_ForgetPassword__login' onClick={() => handleTarget?.()}>直接登录</span>
                </Form.Item>
            </div>
        );
    }
}

export default NewPassword;