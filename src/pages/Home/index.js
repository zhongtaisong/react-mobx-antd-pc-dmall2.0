import React from 'react';
// 走马灯
import CarouselBox from './components/CarouselBox';

// 本周热门
import HotThisWeek from './components/HotThisWeek';

// 本周热门 - 数据
import hotThisWeekState from './components/HotThisWeek/state';

class Home extends React.Component {

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