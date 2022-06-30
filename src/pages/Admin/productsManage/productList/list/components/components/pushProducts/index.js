import React from 'react';
import { Form, Row, Col, Select } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils } from '@utils';
// 全局公共方法
import { UploadImg } from '@com';
const { Option } = Select;

const onFieldsChange = (props, changedFields) => {
    props.setFormData({...props.formData, ...formUtils.formToMobx(changedFields)});
};

const mapPropsToFields = (props) => {
    if( props.formData ){
        return formUtils.mobxToForm({...props.formData});
    }
};

// ----------------------------------- 推广商品 ----------------------------------- //
@observer
class Index extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm( this.props.form );
    }

    // banner推广选择是时，展示banner上传入口
    watchBanner = (value, option) => {
        const { setIsUpload } = this.props;
        if( value == 103 ){
            setIsUpload && setIsUpload( true );
        }else if( value == 13 ){
            setIsUpload && setIsUpload( false );
        }
    }

    render() {
        let { form: { getFieldDecorator }, setFileListArr, fileListArr, delList, setDelList, isDisabled=false, isUpload=false } = this.props;
        if( isDisabled ){
            getFieldDecorator = (...rest) => {
                return element => {
                    let newElement = React.cloneElement(element, {
                        disabled: true
                    });
                    return this.props.form.getFieldDecorator(...rest)(newElement);
                };
            };
        }
        return (
            <Form layout='inline' className='drawer_form'>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item label="热门推荐" className='selects'>
                            {
                                getFieldDecorator('hot', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择"
                                    >
                                        <Option value={ 101 }>是</Option>
                                        <Option value={ 11 }>否</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="单品推广" className='selects'>
                            {
                                getFieldDecorator('single', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择"
                                    >
                                        <Option value={ 102 }>是</Option>
                                        <Option value={ 12 }>否</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item label="banner推广" className='selects'>
                            {
                                getFieldDecorator('banner', {
                                    rules: [{ 
                                        required: true,
                                        message: '必填' 
                                    }]
                                }
                                )(
                                    <Select
                                        placeholder="请选择"
                                        onChange={ this.watchBanner }
                                    >
                                        <Option value={ 103 }>是</Option>
                                        <Option value={ 13 }>否</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Col>
                    {
                        isUpload ? (
                            <Col span={ 24 }>
                                <div style={{ padding: '10px 0' }}>提示：每张图片宽度为：1098px，高度不限；每张图片大小限制在2M以内；最多上传1张图片</div>
                                {/* 上传商品大图 */}
                                <UploadImg 
                                    downloadUrl='products/download'
                                    fileNum={ 1 }
                                    setFileListArr={ setFileListArr }
                                    fileListArr={ fileListArr }
                                    disabled={ isDisabled }
                                    delList={ delList }
                                    setDelList={ setDelList }
                                    uploadText='点击上传banner'
                                />
                            </Col>
                        ) : ''
                    }
                </Row>
            </Form>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(Index);