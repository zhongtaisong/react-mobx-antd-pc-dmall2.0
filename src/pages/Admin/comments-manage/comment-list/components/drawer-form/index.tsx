import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Select } from 'antd';
// 数据
import state from './state';

/**
 * 表单内容
 */
@observer
class DrawerForm extends React.PureComponent<{
    /**
     * 是否禁止编辑
     */
    isDisabledEdit: boolean;
}, any> {

    componentDidMount() {
        state.getUnameAndPidFn();
    }

    render() {
        const { usersList, lidList } = state;
        const { isDisabledEdit } = this.props;

        return (       
            <>
                <Form.Item 
                    label='用户名'
                    name="uname"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                    }]}
                >
                    <Select
                        disabled={ isDisabledEdit }
                        placeholder="请选择"
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            usersList.map(item => (
                                <Select.Option key={item.value}>{item.text}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='商品编号'
                    name="pid"
                    rules={[{ 
                        required: true,
                        message: '必填'
                    }]}
                >
                    <Select placeholder="请选择" disabled={ isDisabledEdit } >
                        {
                            lidList.map(item => (
                                <Select.Option key={ item.value }>{ item.text }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='评论内容'
                    name="content"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input.TextArea showCount maxLength={ 300 } allowClear autoSize placeholder='请输入评论内容' />
                </Form.Item>
            </>
        );
    }
}

export default DrawerForm;