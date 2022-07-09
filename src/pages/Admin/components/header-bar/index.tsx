import React from 'react';
import { observer } from 'mobx-react';
import { Anchor } from 'antd';
// 用户菜单
import TopMenu from './components/top-menu';
// 搜索区域
import SearchArea from './components/search-area';
// less样式
import './index.less';

// 顶部导航
@observer
class HeaderBar extends React.Component<any, any> {
    render() {
        return (
            <div className='dm_HeaderBar'>
                {/* <Anchor> */}
                <TopMenu {...this.props} />
                <SearchArea {...this.props} />
                {/* </Anchor> */}
            </div>
        );
    }
}

export default HeaderBar;