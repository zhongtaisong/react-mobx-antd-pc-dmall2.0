import React from 'react';
// 走马灯
import CarouselBox from './components/carousel-box';

// 本周热门
import HotThisWeek from './components/hot-this-week';

// 本周热门 - 数据
import hotThisWeekState from './components/hot-this-week/state';
import './index.less';

/**
 * 首页
 */
class Home extends React.PureComponent<any, any> {

    componentDidMount() {
        hotThisWeekState.productsListData();
    }

    render() {
        return (
            <div className='dm_Home'>
                <CarouselBox {...this.props} />
                <HotThisWeek {...this.props} />
            </div>
        );
    }
}

export default Home;