import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 规格
import CommoditySpecification from './components/CommoditySpecification';
// 详情
import CommodityDetails from './components/CommodityDetails';
// 数据
import indexState from './state';
// 样式
import './index.less';

// 商品详情
@observer
class ProductsDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        id && indexState.selectProductsDetailData({ id });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.match.params.id && nextProps.match.params.id && this.props.match.params.id != nextProps.match.params.id ){
            nextProps.match.params.id && indexState.selectProductsDetailData({
                id: nextProps.match.params.id
            });
        }
    }

    render() {
        const { basicInfo, imgList, specs, params, detailsPic } = indexState;
        return (
            <div className='dm_ProductsDetail'>
                <div className='common_width'>
                    <CommoditySpecification 
                        {...this.props}
                        basicInfo={ toJS(basicInfo) || {} }
                        imgList={ toJS(imgList) || [] }
                        specs={ toJS(specs) || [] }
                    />
                    <CommodityDetails 
                        {...this.props} 
                        params={ toJS(params) || {} }
                        detailsPic={ toJS(detailsPic) || []}
                    />
                </div>
            </div>
        );
    }
}

export default ProductsDetail;