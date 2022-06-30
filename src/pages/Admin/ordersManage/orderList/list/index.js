import React from 'react';
import { Form } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 全局公共组件
import { OrderDetails } from '@com';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 订单列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectOrdersData();
        state.selectUsersData();
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectOrdersData();
    }

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
    };

    componentWillUnmount() {
        store.clearMobxTableData();
        state.clearMobxData();
    }

    render() {
        let { usersList } = state;
        const { dataList, drawerVisible, current, total, pageSize, id } = store;
        usersList = toJS( usersList );
        const cls = columns.map(col => {
            if( col.dataIndex == 'uname' && usersList.length ){
                return {
                    ...col,
                    filters: usersList,
                    onFilter: (value, record) => record.uname.indexOf(value) === 0
                };
            }
            return { ...col };
        });
        return (
            <div className='common_width common_bg' style={{
                padding: '10px',
                marginBottom: '42px'
            }}>
                <Table 
                    columns={ cls }
                    dataSource={ toJS( dataList ) }
                    current={ current }
                    total={ total }
                    pageSize={ pageSize }
                    rowKey='id'
                    scroll={{ x: false, y: false }}
                    paginationChange={ this.pageChange }    
                    isAdd={ false }
                />
                <Drawer 
                    title='查看订单'
                    width={ 1100 }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={
                        <OrderDetails 
                            id={ id }
                        />
                    }
                    className='dm_orderList'
                />
            </div>
        );
    }
}

export default Form.create()(List);