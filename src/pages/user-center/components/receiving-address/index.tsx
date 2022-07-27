import React from 'react';
import { Table, Button, Row } from 'antd';
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

// 收货地址
@observer
class EditableTable extends React.PureComponent<any, any> {

    componentDidMount() {
        state.selAddressData();
    }

    render() {
        const { dataSource, visible } = state;
        return (
            <div className='dm_ReceivingAddress'>
                <Row style={{ paddingBottom: '6px', textAlign: 'right' }}>
                    <Button type="primary"                         
                        onClick={() => state.setVisible( true )}
                        icon='plus'
                    >添加</Button>
                </Row>
                <Row>
                    <Table
                        bordered
                        dataSource={ toJS( dataSource ) }
                        columns={ columns as any }
                        // scroll={{ x: false, y: false }}
                        rowKey={ (record) => record.id }
                        pagination={ false }
                        size='middle'
                    />
                </Row>
                <AddressModal visible={ visible } />
            </div>
        );
    }
}

export default EditableTable;