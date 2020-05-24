import React, { Fragment } from 'react';
import { Form, Row, Col, Select, Checkbox, Switch } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共方法
import { formUtils } from '@utils';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

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

    constructor(props) {
        super(props);
        this.state = {
            chk: {},
            checkedRole: null
        };
    }

    componentDidMount() {
        const { formData={} } = this.props || {};
        this.props.setForm && this.props.setForm( this.props.form );
        state.getUname();
        formData && formData.role && this.setState({
            checkedRole: formData.role
        });
    }

    // 开关
    handleSwitch = (that, value) => {
        let { chk } = this.state;
        let { formData, setFormData } = this.props;
        chk[that] = value;
        this.setState({
            chk
        });
        if( !value ){
            formData[`${that}Btn`] = [];
            setFormData(formData);
        }
    }

    // 监听角色变化
    handleRole = (value, option) => {
        this.setState({
            checkedRole: value
        });
    }

    render() {
        let {
            form: { getFieldDecorator },
            isDisabled, id, formData, unameArr
        } = this.props;
        const { chk, checkedRole } = this.state;
        let { usersList } = state;
        usersList = toJS(usersList);
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
        let { role } = toJS($state.adminObj) || {};
        const userArr = usersList.filter(item => !unameArr.includes(item.value) );
        return (
            <Form layout='inline' className='drawer_form'>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item label="用户名">
                            {
                                getFieldDecorator('uname', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择"
                                        disabled={ !!id }
                                    >
                                        {
                                            userArr.map(item => (
                                                <Select.Option key={ item.value }>{ item.text }</Select.Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="角色">
                            {
                                getFieldDecorator('role', {
                                    rules: [{
                                        required: true,
                                        message: '必选'
                                    }]
                                })(
                                    <Select placeholder='请选择' onChange={ this.handleRole }>
                                        {
                                            isDisabled ? (
                                                <Select.Option value='100'>超级管理员</Select.Option>
                                            ) : ''
                                        }
                                        {
                                            role == 100 || isDisabled ? (
                                                <Select.Option value='10'>管理员</Select.Option>
                                            ) : ''
                                        }
                                        <Select.Option value='1'>访客</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col> 
                </Row>
                <Row>                    
                    <Col span={ 24 }>
                        <Form.Item label="品牌管理">
                            {
                                getFieldDecorator('brandMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'brand') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('brandBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['brandMenu'] || formData['brandMenu'] == 1 ? false : true }>
                                        <Row>
                                            {/* <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col> */}
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Fragment>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 1 }>添加</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 2 }>删除</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 3 }>修改</Checkbox>
                                                        </Col>
                                                    </Fragment>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>
                    </Col>

                    <Col span={ 24 }>
                        <Form.Item label="商品管理">
                            {
                                getFieldDecorator('productMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'product') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('productBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['productMenu'] || formData['productMenu'] == 1 ? false : true }>
                                        <Row>
                                            <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col>
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Fragment>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 1 }>添加</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 2 }>删除</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 3 }>修改</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 5 }>上架</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 6 }>下架</Checkbox>
                                                        </Col>
                                                    </Fragment>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>
                    </Col>
                    
                    <Col span={ 24 }>
                        <Form.Item label="订单管理">
                            {
                                getFieldDecorator('orderMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'order') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('orderBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['orderMenu'] || formData['orderMenu'] == 1 ? false : true }>
                                        <Row>
                                            <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col>
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Col span={ 8 }>
                                                        <Checkbox value={ 2 }>删除</Checkbox>
                                                    </Col>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>
                    </Col>
                    
                    <Col span={ 24 }>
                        <Form.Item label="用户管理">
                            {
                                getFieldDecorator('userMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'user') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('userBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['userMenu'] || formData['userMenu'] == 1 ? false : true }>
                                        <Row>
                                            <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col>
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Fragment>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 1 }>添加</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 2 }>删除</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 3 }>修改</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 5 }>重置密码</Checkbox>
                                                        </Col>
                                                    </Fragment>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>
                    </Col>
                    
                    <Col span={ 24 }>
                        <Form.Item label="评论管理">
                            {
                                getFieldDecorator('commentMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'comment') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('commentBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['commentMenu'] || formData['commentMenu'] == 1 ? false : true }>
                                        <Row>
                                            <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col>
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Fragment>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 1 }>添加</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 2 }>删除</Checkbox>
                                                        </Col>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 3 }>修改</Checkbox>
                                                        </Col>
                                                    </Fragment>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                )
                            }
                        </Form.Item>
                    </Col>                                
                    <Col span={ 24 }>
                        <Form.Item label="权限管理">
                            {
                                getFieldDecorator('adminMenu', {
                                    rules: [{
                                        required: false,
                                        message: '非必选'
                                    }],
                                    valuePropName: 'checked'
                                })(
                                    <Switch onChange={ this.handleSwitch.bind(this, 'admin') } />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="操作按钮">
                            {
                                getFieldDecorator('adminBtn', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必选' 
                                    }]
                                }
                                )(
                                    <Checkbox.Group style={{ width: '100%' }} disabled={ chk['adminMenu'] || formData['adminMenu'] == 1 ? false : true }>
                                        <Row>
                                            <Col span={ 8 }>
                                                <Checkbox value={ 4 }>查看</Checkbox>
                                            </Col>
                                            {
                                                checkedRole && checkedRole != 1 ? (
                                                    <Fragment>
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 1 }>添加</Checkbox>
                                                        </Col>
                                                        {
                                                            checkedRole == 100 ? (
                                                                <Col span={ 8 }>
                                                                    <Checkbox value={ 2 }>删除</Checkbox>
                                                                </Col>
                                                            ) : ''
                                                        }
                                                        <Col span={ 8 }>
                                                            <Checkbox value={ 3 }>修改</Checkbox>
                                                        </Col>
                                                    </Fragment>
                                                ) : ''
                                            }
                                        </Row>
                                    </Checkbox.Group>
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