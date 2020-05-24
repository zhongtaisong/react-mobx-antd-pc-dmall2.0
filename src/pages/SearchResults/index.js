import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Typography } from 'antd';
// 各种表头
import { columns } from './data';
// less样式
import './index.less';

// 搜索结果展示页面
@observer
class SearchResults extends React.Component {
    render() {
        const { searchResultList } = this.props;
        return (
            <div className='common_width dm_SearchResults'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>搜索结果</Typography.Title>
                    <div>共搜索到 <i>{ searchResultList.length }</i> 条数据</div>
                </Row>
                <Table 
                    columns={ columns } 
                    dataSource={ searchResultList } 
                    rowKey={ (record) => record.id }
                    pagination={ false }
                    scroll={{ x: false, y: false }}
                    showHeader={ false }
                />
            </div>
        );
    }
}

export default SearchResults;