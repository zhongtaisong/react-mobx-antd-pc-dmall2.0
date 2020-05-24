import React from 'react';
import { Form, Row, Col, Input, message, Button } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 设置
import { PWD_KEY } from '@config';
// 双向绑定
import { formUtils } from '@utils';
// 数据
import state from './state';

const onFieldsChange = (props, changedFields) => {
    props.setLoginPassword01({...toJS( props.loginPassword ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.loginPassword ) ){
        return formUtils.mobxToForm({...toJS( props.loginPassword )});
    }
};

// 登录密码
@observer
class LoginPassword extends React.Component {

    componentDidMount() {
        state.setHistory( this.props.history );
    }

    // 提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if ( !err ) {
                if( values.newUpwd !== values.confirmNewUpwd ){
                    message.error('两次输入的新密码不一致');
                    return;
                }else{
                    values.oldUpwd = this.$md5(values.oldUpwd + PWD_KEY);
                    values.newUpwd = this.$md5(values.newUpwd + PWD_KEY);
                    delete values['confirmNewUpwd'];
                    state.updateUpwdData(values);
                }
            }
        });
    }

    // 校验两次输入的新密码是否一致
    validateUpwd = (rule, value, callback) => {
        const { fullField } = rule || {};
        const { getFieldValue } = this.props.form;
        if( fullField == 'newUpwd' ){
            if( getFieldValue && getFieldValue('confirmNewUpwd') && getFieldValue('confirmNewUpwd') != value ){
                callback('两次输入的新密码不一致');
            }
        }else if( fullField == 'confirmNewUpwd' ){
            if( getFieldValue && getFieldValue('newUpwd') && getFieldValue('newUpwd') != value ){
                callback('两次输入的新密码不一致');
            }
        }
        callback();
    }

    componentWillUnmount() {
        this.props.setLoginPassword01();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='dm_LoginPassword'>
                <Form layout="inline">
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="旧密码">
                                {
                                    getFieldDecorator('oldUpwd', {
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
                            <Form.Item label="新密码">
                                {
                                    getFieldDecorator('newUpwd', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        },{
                                            validator: this.validateUpwd
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
                            <Form.Item label="确认新密码">
                                {
                                    getFieldDecorator('confirmNewUpwd', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        },{
                                            validator: this.validateUpwd
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }></Col>
                    </Row>
                    <Row className='submit'>
                        <Col span={ 24 }>
                            <Form.Item>
                                <Button type="primary" onClick={ this.handleSubmit }>提交</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(LoginPassword);