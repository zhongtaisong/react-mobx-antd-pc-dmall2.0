import React from 'react';
import { Form, Select, Checkbox, Switch, Divider } from 'antd';
import { observer } from 'mobx-react';
// 数据
import state from './state';
import { OPERATION_BTN, USER_ROLE } from './../../data';
import { IFormProps } from '../../types';

/**
 * 表单内容
 */
@observer
class DrawerForm extends React.PureComponent<{
    /**
     * 是否禁止编辑
     */
    isDisabledEdit: boolean;
    /**
     * 外部传入属性
     */
    formProps: IFormProps;
}, any> {

    componentDidMount() {
        state.getUnameFn();
    }

    render() {
        const { usersList, roleList } = state;
        const { isDisabledEdit } = this.props;

        return (
            <>
                <Form.Item 
                    label='用户名'
                    name="uname"
                    rules={[{ 
                        required: true, 
                        message: '必选', 
                    }]}
                >
                    <Select
                        placeholder="请选择"
                        disabled={ isDisabledEdit }
                    >
                        {
                            usersList.map(item => (
                                <Select.Option key={ item }>{ item }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='角色'
                    name="role"
                    rules={[{ 
                        required: true, 
                        message: '必选', 
                    }]}
                >
                    <Select placeholder='请选择'>
                        {
                            Object.entries(USER_ROLE).map(([value, name]) => (
                                <Select.Option key={ Number(value) }>{ name || '-' }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                {/* 渲染组件 - 菜单状态、操作权限 */}
                { this.renderFunction() }
            </>
        );
    }
    
    /**
     * 渲染组件 - 菜单状态、操作权限
     */
    renderFunction = () => {
        const { formProps } = this.props;
        if(!formProps?.role) return;

        return (
            <>
                <Divider orientation="left" >品牌管理</Divider>

                <Form.Item 
                    label='菜单状态'
                    name="brandMenu"
                    valuePropName='checked'
                    initialValue={ false }
                >
                    <Switch />
                </Form.Item>

                {
                    formProps?.brandMenu && formProps?.brandBtn?.length ? (
                        <Form.Item 
                            label='操作权限'
                            name="brandBtn"
                        >
                            <Checkbox.Group>
                                {
                                    Object.entries(OPERATION_BTN).map(([value, name]) => {
                                        if(!['1', '2', '3'].includes(value)) return null;
                                        if(!formProps?.brandBtn?.includes?.(value)) return null;
        
                                        return (
                                            <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                        );
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    ) : null
                }

                <Divider orientation="left" >商品管理</Divider>

                <Form.Item 
                    label='菜单状态'
                    name="productMenu"
                    valuePropName='checked'
                    initialValue={ false }
                >
                    <Switch />
                </Form.Item>

                {
                    formProps?.productMenu && formProps?.productBtn?.length ? (
                        <Form.Item 
                            label='操作权限'
                            name="productBtn"
                        >
                            <Checkbox.Group>
                                {
                                    Object.entries(OPERATION_BTN).map(([value, name]) => {
                                        if(!['1', '2', '3', '5', '6'].includes(value)) return null;
                                        if(!formProps?.productBtn?.includes?.(value)) return null;
        
                                        return (
                                            <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                        );
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    ) : null
                }

                <Divider orientation="left" >订单管理</Divider>

                <Form.Item 
                    label='菜单状态'
                    name="orderMenu"
                    valuePropName='checked'
                    initialValue={ false }
                >
                    <Switch />
                </Form.Item>

                {
                    formProps?.orderMenu && formProps?.orderBtn?.length ? (
                        <Form.Item 
                            label='操作权限'
                            name="orderBtn"
                        >
                            <Checkbox.Group>
                                {
                                    Object.entries(OPERATION_BTN).map(([value, name]) => {
                                        if(!['2', '4'].includes(value)) return null;
                                        if(!formProps?.orderBtn?.includes?.(value)) return null;
        
                                        return (
                                            <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                        );
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    ) : null
                }
                    
                <Divider orientation="left" >评价管理</Divider>

                <Form.Item 
                    label='菜单状态'
                    name="commentMenu"
                    valuePropName='checked'
                    initialValue={ false }
                >
                    <Switch />
                </Form.Item>

                {
                    formProps?.commentMenu && formProps?.commentBtn?.length ? (
                        <Form.Item 
                            label='操作权限'
                            name="commentBtn"
                        >
                            <Checkbox.Group>
                                {
                                    Object.entries(OPERATION_BTN).map(([value, name]) => {
                                        if(!['1', '2', '3'].includes(value)) return null;
                                        if(!formProps?.commentBtn?.includes?.(value)) return null;
        
                                        return (
                                            <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                        );
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    ) : null
                }

                {
                    formProps?.userMenu ? (
                        <>
                            <Divider orientation="left" >用户管理</Divider>
            
                            <Form.Item 
                                label='菜单状态'
                                name="userMenu"
                                valuePropName='checked'
                                initialValue={ false }
                            >
                                <Switch />
                            </Form.Item>

                            {
                                formProps?.userBtn?.length ? (
                                    <Form.Item 
                                        label='操作权限'
                                        name="userBtn"
                                    >
                                        <Checkbox.Group>
                                            {
                                                Object.entries(OPERATION_BTN).map(([value, name]) => {
                                                    if(!['1', '2', '3', '4', '7'].includes(value)) return null;
                                                    if(!formProps?.userBtn?.includes?.(value)) return null;

                                                    return (
                                                        <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                                    );
                                                })
                                            }
                                        </Checkbox.Group>
                                    </Form.Item>
                                ) : null
                            }
                        </>
                    ) : null
                }
                
                {
                    formProps?.adminMenu ? (
                        <>
                            <Divider orientation="left" >权限管理</Divider>
                                        
                            <Form.Item 
                                label='菜单状态'
                                name="adminMenu"
                                valuePropName='checked'
                                initialValue={ false }
                            >
                                <Switch />
                            </Form.Item>
            
                            {
                                formProps?.adminBtn?.length ? (
                                    <Form.Item 
                                        label='操作权限'
                                        name="adminBtn"
                                    >
                                        <Checkbox.Group>
                                            {
                                                Object.entries(OPERATION_BTN).map(([value, name]) => {
                                                    if(!['1', '2', '3', '4'].includes(value)) return null;
                                                    if(!formProps?.adminBtn?.includes?.(value)) return null;
                    
                                                    return (
                                                        <Checkbox key={ value } value={ value }>{ name }</Checkbox>
                                                    );
                                                })
                                            }
                                        </Checkbox.Group>
                                    </Form.Item>
                                ) : null
                            }
                        </>
                    ) : null
                }
            </>
        );
    }
}

export default DrawerForm;