import React from 'react';
import { Table, Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 添加收货地址
import AddressModal from './components/address-modal';
// 表头
import columns from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 收货地址
 */
@observer
class EditableTable extends React.PureComponent<any, {
    /**
     * AddressModal是否可见
     */
    isVisible: boolean;
    /**
     * AddressModal外部入参
     */
    addressModalData: {
        [key: string]: any;
    };
}> {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            addressModalData: {},
        };
    }

    componentDidMount() {
        state.selAddressData();
    }

    render() {
        const { isVisible, addressModalData, } = this.state;
        
        return (
            <div className='dm_ReceivingAddress'>
                <div className='dm_ReceivingAddress__btn'>
                    <Button type="primary"                         
                        onClick={() => {
                            this.setState({ 
                                isVisible: true,
                                addressModalData: {},
                            });
                        }}
                    >添加</Button>
                </div>

                <div className='dm_ReceivingAddress__table'>
                    <Table
                        bordered
                        dataSource={toJS(state?.dataSource)}
                        columns={ 
                            columns({
                                onDeleteAddressClick: (id) => {
                                    state.delAddressData({ id });
                                },
                                onEditAddressClick: (visible, obj) => {
                                    this.setState({ 
                                        isVisible: visible,
                                        addressModalData: obj,
                                    });
                                },
                            }) as any
                        }
                        pagination={ false }
                        size='middle'
                        rowKey="id"
                    />
                </div>

                {/* 地址弹窗 */}
                <AddressModal 
                    visible={ isVisible } 
                    addressModalData={ addressModalData }
                    onOk={ this.onAddressModalOk }
                    onCancel={ this.onAddressModalCancel }
                 />
            </div>
        );
    }

    /**
     * AddressModal - 确定 - 操作
     */
    onAddressModalOk = (values) => {
        state.editAddressData(values);
        this.onAddressModalCancel();
    }

    /**
     * AddressModal - 取消 - 操作
     */
    onAddressModalCancel = () => {
        this.setState({ 
            isVisible: false,
            addressModalData: {},
        });
    }

}

export default EditableTable;