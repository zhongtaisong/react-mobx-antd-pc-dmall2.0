import React from 'react';
import { Table, Button } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 添加收货地址
import AddressModal from './components/address-modal';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 收货地址
 */
@observer
class EditableTable extends React.PureComponent<any, any> {

    componentDidMount() {
        state.selAddressData();
    }

    render() {
        const { dataSource, visible } = state;
        
        return (
            <div className='dm_ReceivingAddress'>
                <div className='dm_ReceivingAddress__btn'>
                    <Button type="primary"                         
                        onClick={() => state.setVisible( true )}
                    >添加</Button>
                </div>

                <div className='dm_ReceivingAddress__table'>
                    <Table
                        bordered
                        dataSource={ toJS( dataSource ) }
                        columns={ columns as any }
                        rowKey={ (record) => record.id }
                        pagination={ false }
                        size='middle'
                    />
                </div>
                <AddressModal visible={ visible } />
            </div>
        );
    }
}

export default EditableTable;