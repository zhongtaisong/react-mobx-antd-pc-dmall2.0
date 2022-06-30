import React from 'react';
import { Table, Button, Row, Col, Pagination, Icon } from 'antd';
import { observer } from 'mobx-react';
// less样式
import './index.less';

@observer
class CustomTable extends React.Component {
    render() {
        const { 
            columns=[], dataSource=[], current, total, pageSize, 
            rowKey, scroll={ x: false, y: false }, paginationChange,
            addTitle='', addClick, isAdd=true, isDisabledBtn=false
        } = this.props;
        return (
            <div className='dm_CustomTable'>
                <Row className='Table'>
                    <Table
                        bordered
                        dataSource={ dataSource }
                        columns={ columns }
                        scroll={ scroll }
                        rowKey={ (record) => record[rowKey] }
                        pagination={ false }
                    />
                </Row>
                <Row className='Pagination'>
                    <Col span={ 4 }>
                        {
                            isAdd ? (
                                <Button type='primary' disabled={ isDisabledBtn } onClick={ addClick }><Icon type="plus" />添加{ addTitle }</Button>
                            ) : ''
                        }
                    </Col>
                    <Col span={ 20 }>
                        <Pagination 
                            showQuickJumper
                            defaultCurrent={ current } 
                            pageSize={ pageSize }
                            total={ total } 
                            onChange={ paginationChange } 
                            showTotal={ total => `共 ${total} 条` }                        
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CustomTable;