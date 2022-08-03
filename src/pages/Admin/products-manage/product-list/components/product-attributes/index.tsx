import React from 'react';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react';

/**
 * 商品属性
 */
class Index extends React.PureComponent<any, any> {
    render() {
        return (
            <>
                <Form.Item 
                    label='商品毛重'
                    name="weight"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='商品产地'
                    name="placeOfOrigin"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='系统'
                    name="systems"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='处理器'
                    name="cpu"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='厚度'
                    name="thickness"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='硬盘容量'
                    name="disk"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='待机时长'
                    name="standbyTime"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='系列'
                    name="series"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='裸机重量'
                    name="bareWeight"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='屏幕尺寸'
                    name="screenSize"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='显卡型号'
                    name="gpu"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='特性'
                    name="characteristic"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='内存容量'
                    name="memory"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='显存容量'
                    name="gpuCapacity"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label='机身材质'
                    name="bodyMaterial"
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