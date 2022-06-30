import React from 'react';
import { Row, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Slider from "react-slick";
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';
const { Meta } = Card;
const { Title } = Typography;

// 热门推荐
@observer
class HotThisWeek extends React.Component {
    render() {
        const { productsList } = state;
        const settings = {
            dots: true,
            infinite: false,
            arrows: false,
            speed: 300,
            slidesToScroll: 1,
            slidesToShow: 5
        };
        return (
            <div className='dm_HotThisWeek'>
                <Row className='title'>热门推荐</Row>
                <div className='common_width'>
                    <Row className='hot_content'>
                        {
                            toJS( productsList ).length ? (
                                <Slider {...settings}>
                                    {
                                        toJS( productsList ).map( item => {
                                            let price = parseFloat(item.price) && parseFloat(item.price).toFixed(2);
                                            return (
                                                <Card
                                                    key={ item.id }
                                                    bordered={ false }
                                                    cover={
                                                        <img
                                                            alt=''
                                                            src={ `${ PUBLIC_URL }${ item.mainPicture }` }
                                                            title={ item.productName }
                                                            onClick={() => {
                                                                this.props.history.push(`/views/products/detail/${item.id}`);
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Meta
                                                        title={ <Title level={ 4 }><span className='unit'>￥</span>{ item.price ? Number(item.price).toFixed(2) : 0 }</Title> }
                                                        description={ 
                                                            <Link 
                                                                to={`/views/products/detail/${item.id}`}
                                                                title={ item.description }
                                                            >{ item.description }</Link> 
                                                        }
                                                    />
                                                </Card>
                                            );
                                        } )
                                    }
                                </Slider>
                            ) : ''
                        }
                    </Row>
                </div>
            </div>
        );
    }
}

export default HotThisWeek;