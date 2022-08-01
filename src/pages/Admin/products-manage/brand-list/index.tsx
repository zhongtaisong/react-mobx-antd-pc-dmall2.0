import React from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
// 表头
import columns from './data';
// 数据
import state from './state';
import './index.less';

/**
 * 品牌列表
 */
@observer
class List extends React.PureComponent<any, {
    /**
     * Modal是否可见
     */
    isVisible: boolean;
    /**
     * 品牌信息
     */
    brandInfo: {
        [key: string]: any;
    };
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            brandInfo: {},
        }
    }

    componentDidMount() {
        state.selectBrandDataFn({
            current: 1,
        });
    }

    render() {
        const { dataList, total, } = state;
        const { isVisible, brandInfo } = this.state;

        return (
            <div className='common_width admin_brand_list'>
                <Button 
                    className='admin_brand_list__addBtn'
                    type='primary'
                    onClick={() => {
                        this.setState({ isVisible: true });
                    }}
                >添加品牌</Button>

                <Table 
                    columns={ 
                        columns({
                            onUpdateClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    brandInfo: obj,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                            onDeleteClick: (id) => state.deleteBrandDataFn(id),
                        }) as any
                    }
                    dataSource={ dataList }
                    bordered
                    pagination={{
                        total,
                        onChange(page) {
                            state.selectBrandDataFn({
                                current: page,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Modal
                    title={`${ brandInfo?.id ? '更新' : '添加' }品牌`}
                    visible={ isVisible }
                    okText="保存"
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                >
                    <Form ref={ this.formRef }>
                        <Form.Item 
                            label='品牌名称'
                            name="brandName"
                            rules={[{ 
                                required: true, 
                                message: '必填', 
                                whitespace: true 
                            }]}
                        >
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { brandInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let res = null;
            if(!brandInfo?.id) {
                res = state.addBrandDataFn(values);
            }else {
                res = state.updateBrandDataFn({
                    ...values,
                    id: brandInfo?.id,
                });
            }

            if(!res) return;
            res?.then?.(bol => {
                if(!bol) return;
                this.onCancelClick();
            });
        });
    }

    /**
     * Modal - 取消 - 操作
     */
    onCancelClick = () => {
        this.setState({ isVisible: false }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default List;