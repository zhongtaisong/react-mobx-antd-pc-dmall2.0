import React from 'react';
import { Form, Row, Col, Input, Radio, DatePicker, Button, message } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
// 全局公共方法
import { formUtils, validatePhone, session } from '@utils';
// 全局公共方法
import { UploadImg } from '@com';
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';

const onFieldsChange = (props, changedFields) => {
    props.setPersonalInformation({...toJS( props.personalInformation ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.personalInformation ) ){
        return formUtils.mobxToForm({...toJS( props.personalInformation )});
    }
};

// 个人资料
@observer
class PersonalInformation extends React.Component {

    // 提交
    handleSubmit = async () => {
        const { fileListArr, delList, updateUserInfoData } = state;
        let formData = new FormData();
        let userInfo = {};
        
        await new Promise((resolve, reject) => {
            this.props.form.validateFields(['phone', 'gender', 'birthday', 'nickName'],(err, values) => {
                if (!err) {
                    values['birthday'] = moment(values['birthday']).format('YYYY-MM-DD');
                    userInfo = {...values};
                    resolve();
                }else{
                    message.error('带*是必填项！');
                }
            });
        });

        await new Promise((resolve, reject) => {
            if( !fileListArr.length ){
                message.error('上传头像，必传项！');
            }else{
                fileListArr.forEach((item, index) => {
                    if( item.originFileObj ){
                        formData.append('avatar', item.originFileObj);
                    }else if( item.url ){
                        let url = item.url.slice(item.url.indexOf('api/') + 4);
                        formData.append('avatar', url);
                    }
                });
                resolve();
            }
        });

        // 表单
        formData.append('userInfo', JSON.stringify(userInfo));
        // 存储被删图片
        formData.append('delList', JSON.stringify(delList));
        formData.append('uname', session.getItem('uname'));
        updateUserInfoData(formData);
    }

    componentDidMount() {
        this.props.avatar && state.setFileListArr([{
            uid: Date.now() + 1,
            name: 'img.png',
            status: 'done',
            url: PUBLIC_URL + this.props.avatar
        }]);
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.avatar != this.props.avatar ){
            state.setFileListArr([{
                uid: Date.now() + 1,
                name: 'img.png',
                status: 'done',
                url: PUBLIC_URL + nextProps.avatar
            }]);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { setFileListArr, fileListArr, delList, setDelList } = state;
        return (
            <div className='dm_PersonalInformation'>
                <Form layout="inline">
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="用户名">
                                {
                                    getFieldDecorator('uname', {
                                        rules: [{ 
                                            required: false, 
                                            message: '非必填' 
                                        }]
                                    }
                                    )(
                                        <Input disabled placeholder='-' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="昵称">
                                {
                                    getFieldDecorator('nickName', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="手机号码">
                                {
                                    getFieldDecorator('phone', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        },{
                                            validator: validatePhone
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="性别">
                                {
                                    getFieldDecorator('gender', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Radio.Group>
                                            <Radio value='0'>男</Radio>
                                            <Radio value='1'>女</Radio>
                                            <Radio value='2'>保密</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="上传头像">
                                {
                                    getFieldDecorator('avatar', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必传' 
                                        }]
                                    }
                                    )(
                                        <UploadImg 
                                            downloadUrl='products/download'
                                            fileNum={ 1 }
                                            setFileListArr={ setFileListArr }
                                            fileListArr={ toJS(fileListArr) }
                                            disabled={ false }
                                            delList={ toJS(delList) }
                                            setDelList={ setDelList }
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="生日">
                                {
                                    getFieldDecorator('birthday', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <DatePicker />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='submit'>
                        <Col span={ 24 }>
                            <Form.Item>
                                <Button type="primary" onClick={ this.handleSubmit }>提交</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(PersonalInformation);