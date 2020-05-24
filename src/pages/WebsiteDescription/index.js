import React from 'react';
import { observer } from 'mobx-react';
// less样式
import './index.less';

// 网站说明
@observer
class WebsiteDescription extends React.Component {
    render() {
        return (
            <div className='dm_WebsiteDescription'>开发中。。。</div>
        );
    }
}

export default WebsiteDescription;