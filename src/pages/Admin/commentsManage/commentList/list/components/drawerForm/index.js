import React from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共方法
import { formUtils } from '@utils';
// 数据
import state from './state';

const { Option } = Select;

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
        state.getUnameAndPid();
    }

    render() {
        let { form: { getFieldDecorator }, isDisabled, id } = this.props;
        const { usersList, lidList } = state;
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
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择"
                                        showSearch
                                        disabled={ !!id }
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            toJS(usersList).map(item => (
                                                <Option key={item.value}>{item.text}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="商品编号">
                            {
                                getFieldDecorator('pid', {
                                    rules: [{
                                        required: true,
                                        message: '必填'
                                    }]
                                })(
                                    <Select
                                        placeholder="请选择"
                                        disabled={ !!id }
                                    >
                                        {
                                            toJS(lidList).map(item => (
                                                <Option key={ item.value }>{ item.text }</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="评论内容">
                            {
                                getFieldDecorator('content', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Input.TextArea placeholder='请输入评论内容' />
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