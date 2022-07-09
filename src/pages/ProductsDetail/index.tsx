import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
// 规格
import CommoditySpecification from './components/CommoditySpecification';
// 详情
import CommodityDetails from './components/CommodityDetails';
// 数据
import indexState from './state';
// 样式
import './index.less';

interface IComponentProps {
    id: string;
}

/**
 * 商品详情
 */
@observer
class ProductsDetail extends React.Component<Partial<RouteComponentProps<IComponentProps>>, any> {

    componentDidMount() {
        const { id } = this.props.match.params;
        id && indexState.selectProductsDetailData({ id });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { match } = this.props;
        const id = match?.params?.id;
        const prevId = prevProps?.match?.params?.id;
        if(id != prevId && id) {
            indexState.selectProductsDetailData({ id });
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