import React from 'react';
import { observer } from 'mobx-react';
// 全局公共组件
import { OrderDetails } from '@com';
// less样式
import './index.less';

// 订单详情
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        const { state } = this.props.location || {};
        state && state.id && this.setState({
            id: state.id
        });
    }

    render() {
        const { id } = this.state;
        if( id ){
            return (
                <OrderDetails 
                    className='dm_OrderDetails_front'
                    id={ this.state.id }
                />
            );
        }else{
            return '';
        }
    }
}

export default Index;