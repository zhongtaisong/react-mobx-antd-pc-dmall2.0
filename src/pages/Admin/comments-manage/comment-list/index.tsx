import React from 'react';
import { Form, Button, Table, Modal } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import moment from 'moment';
// 添加商品 - 表单
import DrawerForm from './components/drawer-form';
// 表头
import columns from './data';
// 数据
import state from './state';
import './index.less';

/**
 * 评价列表
 */
@observer
class List extends React.PureComponent<any, {
    /**
     * Modal是否可见
     */
    isVisible: boolean;
    /**
     * 表单信息
     */
    formInfo: {
        [key: string]: any;
    };
    /**
     * 是否禁用表单
     */
    isDisabledForm: boolean;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            formInfo: {},
            isDisabledForm: false,
        }
    }

    componentDidMount() {
        state.selectCommentDataFn({
            current: 1,
        });
    }

    render() {
        const { dataSource, total, } = state;
        const { isVisible, formInfo, isDisabledForm } = this.state;

        return (
            <div className='common_width admin_comment_list'>
                <Button 
                    className='admin_comment_list__addBtn'
                    type='primary'
                    onClick={() => {
                        this.setState({ isVisible: true });
                    }}
                >添加评价</Button>
                
                <Table 
                    columns={ 
                        columns({
                            onUpdateClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                            onDeleteClick: (id) => state.deleteCommentDataFn(id),
                            onDetailClick: (obj) => {
                                this.setState({ 
                                    isVisible: true,
                                    formInfo: obj,
                                    isDisabledForm: true,
                                }, () => {
                                    this.formRef.current.setFieldsValue({...obj});
                                });
                            },
                        }) as any
                    }
                    dataSource={ dataSource }
                    bordered
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        total,
                        onChange(current, pageSize) {
                            state.selectCommentDataFn({
                                current,
                                pageSize,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Modal
                    title={`${ formInfo?.id ? '更新' : '添加' }评价`}
                    visible={ isVisible }
                    okText="保存"
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                    wrapClassName='admin_comment_list__modal'
                    bodyStyle={{ 
                        maxHeight: 400,
                        overflowY: "scroll",
                    }}
                    {...isDisabledForm ? { footer: null, } : {}}
                >
                    <Form 
                        className='admin_comment_list__modal--form'
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        autoComplete="off"
                        ref={ this.formRef }
                        disabled={ isDisabledForm }
                    >
                        <DrawerForm isDisabledEdit={ Boolean(formInfo?.id) } />
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { formInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let res = null;
            if(!formInfo?.id) {
                res = state.addCommentDataFn(values);
            }else {
                res = state.updateCommentDataFn({
                    ...values,
                    id: formInfo?.id,
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
        this.setState({ 
            isVisible: false,
            formInfo: {},
            isDisabledForm: false,
        }, () => {
            this.formRef.current.resetFields();
        });
    }
    
}

export default List;