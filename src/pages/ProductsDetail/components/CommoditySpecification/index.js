import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Typography, InputNumber, Button, Tooltip } from 'antd';
// 设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';
const { Title, Paragraph } = Typography;

// 商品规格
@observer
class CommoditySpecification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionIndex: 0,
            num: 1
        };
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    // 选择预览图片
    handleTogglePic = (index) => {
        this.setState(() => ({
            actionIndex: index
        }));
    }

    // 选择规格
    handleToggleSpecs = (id) => {
        if( id ){
            this.props.history.push(`/views/products/detail/${id}`);
            this.setState(() => ({
                num: 1,
                actionIndex: 0
            }));
        }
    }

    // 数量
    watchNumber = (value) => {
        this.setState(() => ({
            num: value
        }));
    }

    // 加入购物车
    handleAddCart = () => {
        const { basicInfo } = this.props;
        if( basicInfo ){
            state.addcartData([{
                pid: basicInfo.id,
                num: this.state.num,
                totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
            }]);
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { basicInfo={} } = this.props;
        const { id } = basicInfo;
        id && this.props.history.push({
            pathname: '/views/products/cart/settlement',
            state: {
                id: [id],
                num: this.state.num,
                type: 'detail'
            }
        });
    }

    render() {
        const { basicInfo, imgList, specs } = this.props;
        const { num } = this.state;
        const { oauthCode } = $state;
        return (
            <div className='CommoditySpecification'>
                <Row>
                    <Col span={ 8 }>
                        <dl>
                            <dt>
                                {
                                    imgList[this.state.actionIndex] ? (
                                        <img src={ PUBLIC_URL + imgList[this.state.actionIndex] } alt='loading...' />
                                    ) : ''
                                }
                            </dt>
                            <dd>
                                {
                                    imgList.map((item, index) => {
                                        return (
                                            <div key={ index } onMouseOver={ this.handleTogglePic.bind(this, index) } className={ this.state.actionIndex === index ? 'active' : '' }>
                                                <img src={ PUBLIC_URL + item } alt='' />
                                            </div>
                                        );
                                    })
                                }
                            </dd>
                        </dl>
                    </Col>
                    <Col span={ 16 }>
                        <Title level={ 4 } title={ basicInfo.description ? basicInfo.description : '敬请期待~~~' }>{ basicInfo.description ? basicInfo.description : '敬请期待~~~' }</Title>
                        <h3 className='ellipsis' title={ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }>{ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }</h3>
                        <div className='price'>售价：
                            <Title level={ 3 }><span className='unit'>￥</span>{ basicInfo.price ? Number(basicInfo.price).toFixed(2) : 0 }</Title>
                        </div>
                        <Row className='Specifications'>
                            <Col span={ 2 }>规格：</Col>
                            <Col span={ 22 }>
                                <Row>
                                    {
                                        specs.length ? (
                                            specs.map(item => {
                                                return (
                                                    <Fragment key={ item.id }>
                                                        <Col span={ 11 } className={ basicInfo.id === item.id ? 'active' : '' }
                                                            onClick={ this.handleToggleSpecs.bind(this, item.id) }
                                                        >
                                                            <Paragraph ellipsis title={ item.spec }>{ item.spec }</Paragraph>
                                                        </Col>
                                                        <Col span={ 1 }></Col>
                                                    </Fragment>
                                                );
                                            })
                                        ) : (
                                            <Fragment>
                                                <Col span={ 11 } >
                                                    <Paragraph ellipsis title='没错，我就是规格'>没错，我就是规格</Paragraph>
                                                </Col>
                                                <Col span={ 1 }></Col>
                                            </Fragment>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                        {
                            oauthCode && oauthCode != 401 ? (
                                <Fragment>
                                    <Row className='Number'>
                                        <Col span={ 2 }>数量：</Col>
                                        <Col span={ 22 }>
                                            <InputNumber min={ 1 } max={ 99 } value={ num } precision={ 0 } onChange={ this.watchNumber } />
                                        </Col>
                                    </Row>
                                    <Row className='handleButton'>
                                        <Col span={ 2 }></Col>
                                        <Col span={ 22 }>
                                            <Button type="primary" size='large' ghost onClick={ this.immediatePurchase }>立即购买</Button>
                                            <Button type="primary" size='large' onClick={ this.handleAddCart }>加入购物车</Button>
                                        </Col>
                                    </Row>
                                </Fragment>
                            ) : ''
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CommoditySpecification;