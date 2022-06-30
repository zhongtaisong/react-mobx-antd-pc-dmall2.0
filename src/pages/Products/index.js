import React, { Fragment } from 'react';
import { Row, Col, Card, Button, InputNumber, Typography, Pagination, Tag, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
// 全局设置
import { PUBLIC_URL, commoditySpecificationState } from '@config';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// 样式
import './index.less';
const { Meta } = Card;
const { Title } = Typography;

// 杂货铺
@observer
class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionIndex: 0,
            numObj: {},
            visible: {},
            filter: {}
        };
    }

    componentDidMount() {
        state.productsData();
        state.filterData();
    }

    // 分页变化
    pageChange = async (page) => {
        await state.setCurrent( page );
        await state.productsData(this.state.filter);
        this.setState({
            numObj: {}
        });
    }

    // 加入购物车
    handleAddCart = (item, key) => {
        if( Object.keys(item).length ){
            let num = !this.state.numObj[key] ? 1 : this.state.numObj[key];
            commoditySpecificationState.addcartData([{
                pid: item.id,
                num,
                totalprice: Number(item.price) * num
            }]);
        }
    }

    // 数量
    watchNumber = (key, value) => {
        let { numObj } = this.state;
        numObj[key] = value;
        this.setState({
            numObj
        });
    }

    // 被选中当前筛选条件
    currentFilter = async (key, value) => {
        let { filter } = this.state;
        filter[key] = value;

        let visible = {};
        Object.keys(filter).map((item, index) => {
            visible[item] = true;
        });
        this.setState({
            visible, filter
        });
        await state.setCurrent();
        await state.productsData(filter);
    }

    // 删除tag
    deleteTag = async (item) => {
        let { filter, visible } = this.state;
        delete filter[item];
        visible[item] = false;
        this.setState({
            visible, filter
        });
        await state.setCurrent();
        await state.productsData(filter);
    }

    // 清空筛选
    clearFilter = async () => {
        this.setState({
            filter: {}
        });
        await state.setCurrent();
        await state.productsData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { productList, current, total, pageSize, filterList } = state;
        const { numObj, filter, visible } = this.state;
        const { oauthCode } = $state;
        // 查字典表
        const { BRAND_LIST } = session.getItem('tableDic');
        return (
            <div className='dm_Products'>
                <div className='common_width'>
                    <div className='filter_title'>
                        <h1>商品筛选</h1>
                        <span>共 { total || 0 }件商品</span>
                    </div>
                    <div className='filter_current'>
                        {
                            Object.keys(filter).length ? (
                                <Fragment>
                                    {
                                        Object.keys(filter).map((item, index) => {
                                            return (
                                                <Tag color='blue' key={ index } visible={ visible[item] } closable onClose={ this.deleteTag.bind(this, item) }>{ item == 'brandId' ? BRAND_LIST[filter[item]] : filter[item] }</Tag>
                                            );
                                        })
                                    }
                                    <p onClick={ this.clearFilter }>清空筛选</p>
                                </Fragment>
                            ) : (                                
                                <Tag color='blue'>暂无筛选条件</Tag>
                            )
                        }
                    </div>
                    <div className='filter_condition'>
                        {
                            filterList.map((f, i) => {
                                return (<Fragment key={ i }>
                                    <Row>
                                        <Col span={ 2 }>品牌：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.brandId.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'brandId', item) }
                                                        >{ BRAND_LIST ? BRAND_LIST[item] : item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>价格：</Col>
                                        <Col span={ 22 }>
                                            {
                                                ["0-3999", "4000-4499", "4500-4999", "5000-5499", "5500-5999", "6000-6999", "7000以上"].map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'price', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>屏幕尺寸：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.screenSize.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'screenSize', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>处理器：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.cpu.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'cpu', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>内存容量：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.memory.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'memory', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>硬盘容量：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.disk.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'disk', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>系统：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.systems.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'systems', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={ 2 }>厚度：</Col>
                                        <Col span={ 22 }>
                                            {
                                                f.thickness.map((item, index) => {
                                                    return (
                                                        <span key={ index }
                                                            onClick={ this.currentFilter.bind(this, 'thickness', item) }
                                                        >{ item }</span>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Fragment>);
                            })
                        }
                    </div>
                    {
                        productList.length ? (
                            <Row className='all_products'>
                                {
                                    productList.map(item => {
                                        return (
                                            <Col span={ 6 } key={ item.key }>
                                                <Card
                                                    key={ item.key }
                                                    bordered={ false }
                                                    cover={
                                                        <img
                                                            alt=''
                                                            src={ `${ PUBLIC_URL }${ item.mainPicture }` }
                                                            onClick={() => this.props.history.push(`/views/products/detail/${item.id}`)}
                                                            title={ item.copywriting }
                                                        />
                                                    }
                                                    actions={ oauthCode && oauthCode != 401 ? [
                                                        <InputNumber min={ 1 } max={ 99 } value={ numObj[`num${item.key}`] || 1 } onChange={ this.watchNumber.bind(this, `num${item.key}`) } />,
                                                        <Button type="primary" ghost onClick={ this.handleAddCart.bind(this, item, `num${item.key}`) }>加入购物车</Button>
                                                    ] : [] }
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
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        ) : (                            
                            <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='抱歉！没有找到符合筛选条件的商品' />
                        )
                    }
                    {
                        total ? (
                            <Pagination 
                                showQuickJumper
                                current={ current } 
                                pageSize={ pageSize }
                                total={ total } 
                                onChange={ this.pageChange } 
                                showTotal={ total => `共 ${total} 条` }
                            />
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default Products;