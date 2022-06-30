import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
// 设置
import { PUBLIC_URL } from '@config';

// 商品详情图片
@observer
class Pictures extends React.Component {
    render() {
        const { detailsPic } = this.props;
        return (
            <Row>
                {
                    detailsPic.map((item, index) => {
                        return (
                            <Col span={ 24 } style={{ textAlign: 'center' }} key={ index }>
                                <img src={ PUBLIC_URL + item } style={{ width: '750px', height: 'auto' }} /> 
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}

export default Pictures;