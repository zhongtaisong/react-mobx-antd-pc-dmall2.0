import React from 'react';
import { Row, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
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
class HotThisWeek extends React.Component<any, any> {
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
        if(!productsList.length) return null;

        return (
            <div className='dm_HotThisWeek'>
                <ul className='common_width dm_HotThisWeek__content'>
                    {
                        productsList.map(item => {
                            const price = !Number.isNaN(Number(item?.price)) ? Number(item.price).toFixed(2) : 0.00;
                            return (
                                <li 
                                    key={ item?.id }
                                    className='dm_HotThisWeek__content--item'
                                >
                                    <img src={ `${ PUBLIC_URL }${ item.mainPicture }` } alt="商品图片" 
                                        onClick={() => this.props?.history?.push?.(`/views/products/detail/${ item?.id }`)}
                                    />
                                    <div className='dm_HotThisWeek__content--item__text'>
                                        <div className='dm_HotThisWeek__content--item__text--title'>
                                            <Link to={`/views/products/detail/${ item?.id }`}>{ item.productName }</Link>
                                            <div className='two_line_ellipsis'>{ item.description }</div>
                                        </div>
                                        <div className='dm_HotThisWeek__content--item__text--price'>
                                            <span>￥</span>
                                            <p>{  price }</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                    {/* <div className='dm_HotThisWeek__content'>
                        {
                            productsList.map( item => {
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
                    </div> */}
                </ul>
            </div>
        );
    }
}

export default HotThisWeek;