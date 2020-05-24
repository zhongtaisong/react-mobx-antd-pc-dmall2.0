import React from 'react';
import { Form, Row, Col, Input, Select, InputNumber } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils, session } from '@utils';
const { TextArea } = Input;
const { Option } = Select;
// 查字典表
const { BRAND_LIST } = session.getItem('selectDic');

const onFieldsChange = (props, changedFields) => {
    props.setFormData({...props.formData, ...formUtils.formToMobx(changedFields)});
};

const mapPropsToFields = (props) => {
    if( props.formData ){
        return formUtils.mobxToForm({...props.formData});
    }
};

// ----------------------------------- 基本信息 ----------------------------------- //
@observer
class Index extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm( this.props.form );
    }

    render() {
        let { form: { getFieldDecorator }, isDisabled=false } = this.props;
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
                        <Form.Item label="品牌" className='selects'>
                            {
                                getFieldDecorator('brandId', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择品牌"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            BRAND_LIST && BRAND_LIST.map(item => (
                                                <Option key={ item.code }>{ item.name }</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="商品名称">
                            {
                                getFieldDecorator('productName', {
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
                    <Col span={ 24 }>
                        <Form.Item label="商品描述">
                            {
                                getFieldDecorator('description', {
                                    rules: [{ 
                                        required: true,
                                        whitespace: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <TextArea placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="促销文案">
                            {
                                getFieldDecorator('copywriting', {
                                    rules: [{ 
                                        required: false,
                                        message: '非必填' 
                                    }]
                                }
                                )(
                                    <TextArea placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="价格（元）">
                            {
                                getFieldDecorator('price', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <InputNumber min={ 0 } step={ 0.01 } placeholder='请输入' />
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="商品规格">
                            {
                                getFieldDecorator('spec', {
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
})(Index);