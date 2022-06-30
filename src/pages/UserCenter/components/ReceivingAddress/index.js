import React from 'react';
import { Table, Button, Row } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 添加收货地址
import AddressModal from './components/addressModal';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 收货地址
@observer
class EditableTable extends React.Component {

    componentDidMount() {
        state.selAddressData();
    }

    // 展示添加收货地址弹出框
    handleAddress = () => {
        state.setVisible( true );
    }

    // 确定
    handleOk = () => {
        state.form.validateFields(async (err, values) => {
            if ( !err ) {
                state.editAddressData(values);
                this.handleCancel();
            }
        });
    }

    // 取消
    handleCancel = () => {
        state.setVisible( false );
        state.setAddressModalData();
    }

    render() {
        const { dataSource, setForm, addressModalData, setAddressModalData, visible } = state;
        return (
            <div className='dm_ReceivingAddress'>
                <Row style={{ paddingBottom: '6px', textAlign: 'right' }}>
                    <Button type="primary"                         
                        onClick={ this.handleAddress }
                        icon='plus'
                    >添加</Button>
                </Row>
                <Row>
                    <Table
                        bordered
                        dataSource={ toJS( dataSource ) }
                        columns={ columns }
                        scroll={{ x: false, y: false }}
                        rowKey={ (record) => record.id }
                        pagination={ false }
                        size='middle'
                    />
                </Row>
                <AddressModal 
                    visible={ visible } 
                    handleOk={ this.handleOk }
                    handleCancel={ this.handleCancel } 
                    setForm={ setForm }
                    addressModalData={ toJS( addressModalData ) }
                    setAddressModalData={ setAddressModalData }
                />
            </div>
        );
    }
}

export default EditableTable;