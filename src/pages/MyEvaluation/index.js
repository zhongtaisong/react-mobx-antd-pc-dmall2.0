import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Col, Input, Form, Typography } from 'antd';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';
const { TextArea } = Input;

// 我的评价
@observer
class MyEvaluation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentWillMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    componentDidMount() {
        const { id } = this.props.location.state || {};
        try{
            if( id ){
                state.productsData({ id });
                this.setState({
                    id
                });
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                state.addcommentsData({
                    pid: this.state.id,
                    ...values
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { products={} } = state;
        return (
            <div className='common_width dm_MyEvaluation'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的评价</Typography.Title>
                    <div></div>
                </Row>
                <Row className='main_content'>
                    <Col span={ 8 }>
                        {
                            products ? (
                                <Fragment>
                                    <Link to={'/views/products/detail/' + products.id}>
                                        <img src={ products.mainPicture ? `${ PUBLIC_URL }${ products.mainPicture }` : products.mainPicture } />
                                        <span title={ products.description }>{ products.description }</span>
                                    </Link>
                                    <p>{ products.price && Number(products.price) ? `￥${Number(products.price).toFixed(2)}` : products.price }</p>
                                </Fragment>
                            ) : ''
                        }
                    </Col>
                    <Col span={ 16 }>
                        <Row>
                            <Col span={ 24 }>
                                <Form>
                                    <Form.Item label='书写评价'>
                                        {
                                            getFieldDecorator('content', {
                                                rules: [{ 
                                                    required: true,
                                                    whitespace: true,
                                                    message: '必填' 
                                                }]
                                            })(
                                                <TextArea maxLength={ 300 } autoSize={{ minRows: 4, maxRows: 6 }} placeholder='300个字以内，必填项' />
                                            )
                                        }
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col span={ 24 } className='sbumit'>
                                <Button type="primary" onClick={ this.handleSubmit }>提交评价</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(MyEvaluation);