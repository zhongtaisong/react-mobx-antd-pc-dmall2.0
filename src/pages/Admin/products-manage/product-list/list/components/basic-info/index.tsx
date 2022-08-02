import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { session } from '@utils';
// 查字典表
const { BRAND_LIST } = session.getItem('selectDic');

/**
 * 基本信息
 */
class Index extends React.PureComponent<any, any> {
    render() {
        return (
            <>
                <Form.Item 
                    label='品牌'
                    name="brandId"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Select
                        placeholder="请选择品牌"
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            BRAND_LIST?.map?.(item => (
                                <Select.Option key={ item.code }>{ item.name }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='商品名称'
                    name="productName"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='商品描述'
                    name="description"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input.TextArea placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='促销文案'
                    name="copywriting"
                >
                    <Input.TextArea placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='价格（元）'
                    name="price"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                    }]}
                >
                    <InputNumber min={ 0 } step={ 0.01 } placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='商品规格'
                    name="spec"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>
            </>
        );
    }
}

export default Index;