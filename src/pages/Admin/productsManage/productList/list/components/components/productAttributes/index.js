import React from 'react';
import { Form, Row, Col, Input } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils } from '@utils';
// 查字典表

const onFieldsChange = (props, changedFields) => {
    props.setFormData({...props.formData, ...formUtils.formToMobx(changedFields)});
};

const mapPropsToFields = (props) => {
    if( props.formData ){
        return formUtils.mobxToForm({...props.formData});
    }
};

// ----------------------------------- 商品属性 ----------------------------------- //
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
                        <Form.Item label="商品毛重">
                            {
                                getFieldDecorator('weight', {
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
                        <Form.Item label="商品产地">
                            {
                                getFieldDecorator('placeOfOrigin', {
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
                        <Form.Item label="系统">
                            {
                                getFieldDecorator('systems', {
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
                        <Form.Item label="处理器">
                            {
                                getFieldDecorator('cpu', {
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
                        <Form.Item label="厚度">
                            {
                                getFieldDecorator('thickness', {
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
                        <Form.Item label="硬盘容量">
                            {
                                getFieldDecorator('disk', {
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
                        <Form.Item label="待机时长">
                            {
                                getFieldDecorator('standbyTime', {
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
                        <Form.Item label="系列">
                            {
                                getFieldDecorator('series', {
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
                        <Form.Item label="裸机重量">
                            {
                                getFieldDecorator('bareWeight', {
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
                        <Form.Item label="屏幕尺寸">
                            {
                                getFieldDecorator('screenSize', {
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
                        <Form.Item label="显卡型号">
                            {
                                getFieldDecorator('gpu', {
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
                        <Form.Item label="特性">
                            {
                                getFieldDecorator('characteristic', {
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
                        <Form.Item label="内存容量">
                            {
                                getFieldDecorator('memory', {
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
                        <Form.Item label="显存容量">
                            {
                                getFieldDecorator('gpuCapacity', {
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
                        <Form.Item label="机身材质">
                            {
                                getFieldDecorator('bodyMaterial', {
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