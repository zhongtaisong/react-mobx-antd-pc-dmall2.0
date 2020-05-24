import React from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
const { TabPane } = Tabs;

@observer
class Index extends React.Component {
    render() {
        const { defaultActiveKey, tabPane=[] } = this.props;
        return (
            <Tabs defaultActiveKey={ defaultActiveKey }>
                {
                    tabPane.map(item => {
                        return (
                            <TabPane tab={ item.tab } key={ item.key }>
                                Content of Tab Pane { item.key }
                            </TabPane>
                        );
                    })
                }
            </Tabs>
        );
    }
}

export default Index;