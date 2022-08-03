import React from 'react';
import { observer } from 'mobx-react';
import { Table, Drawer } from 'antd';
// 全局公共组件
import { OrderDetails } from '@com';
// 表头
import columns from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 订单列表
 */
@observer
class List extends React.PureComponent<any, {
    /**
     * Drawer是否可见
     */
    isVisible: boolean;
    /**
     * 订单id
     */
    orderId: number;
}> {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            orderId: null,
        }
    }

    componentDidMount() {
        state.selectOrdersDataFn({
            current: 1,
        });
    }

    render() {
        const { dataSource, total, } = state;
        const { isVisible, orderId } = this.state;

        return (
            <div className='common_width admin_order_list'>
                <Table 
                    columns={ 
                        columns({
                            onDeleteClick: (id) => state.deleteOrdersDataFn(id),
                            onDetailClick: (orderId) => {
                                this.setState({ 
                                    isVisible: true,
                                    orderId,
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
                            state.selectOrdersDataFn({
                                current,
                                pageSize,
                            });
                        }
                    }}
                    rowKey='id'
                />

                <Drawer
                    title="查看订单"
                    width={ 1100 }
                    onClose={() => {
                        this.setState({ isVisible: false, });
                    }}
                    visible={ isVisible }
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <OrderDetails id={ orderId } />
                </Drawer>
            </div>
        );
    }
}

export default List;