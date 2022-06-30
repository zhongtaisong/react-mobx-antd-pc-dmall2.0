import React from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
// 规格参数
import Parameter from './../Parameter';
// 商品详情图片
import Pictures from './../Pictures';
// 商品评价
import CommodityEvaluation from './../CommodityEvaluation';
// less样式
import './index.less';
const { TabPane } = Tabs;

// 商品详情区域
@observer
class CommodityDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 1
        };
    }

    // 监听tab
    tabsChange = (activeKey) => {
        this.setState({
            key: activeKey
        });
    }

    render() {
        const { params, detailsPic } = this.props;
        const { key } = this.state;
        return (
            <div className='CommodityDetails'>
                <Tabs defaultActiveKey="1" style={{ padding: '0 20px', color: '#666' }} onChange={ this.tabsChange }>
                    <TabPane tab={ <span className='tab_title'>商品介绍</span> } key={ 1 }>
                        <Parameter params={ params } />
                        <Pictures detailsPic={ detailsPic } />
                    </TabPane>
                    <TabPane tab={ <span className='tab_title'>商品评价</span> } key={ 2 } >
                        {
                            key == 2 ? (
                                <CommodityEvaluation pid={ params.id || '' } />
                            ) : ''
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default CommodityDetails;