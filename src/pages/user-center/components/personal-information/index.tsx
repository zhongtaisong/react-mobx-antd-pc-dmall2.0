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

/**
 * 个人资料
 */
@observer
class PersonalInformation extends React.Component<any, any> {

    componentDidMount() {
        this.props.avatar && state.setFileListArr([{
            uid: Date.now() + 1,
            name: 'img.png',
            status: 'done',
            url: PUBLIC_URL + this.props.avatar
        }]);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { avatar } = this.props;
        if(avatar !== prevProps.avatar){
            state.setFileListArr([{
                uid: Date.now() + 1,
                name: 'img.png',
                status: 'done',
                url: PUBLIC_URL + avatar
            }]);
        }

    }

    render() {
        const { setFileListArr, fileListArr, delList, setDelList } = state;
        
        return (
            <div className='dm_PersonalInformation'>
                <Form layout="inline"
                    onFinish={ this.handleSubmit }
                >
                    <Form.Item
                        label="用户名"
                        name="uname"
                    >
                        <Input disabled placeholder='-' />
                    </Form.Item>

                    <Form.Item
                        label="昵称"
                        name="nickName"
                        rules={[{ 
                            required: true, 
                            message: '必填', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>

                    <Form.Item 
                        label="手机号码"
                        name="phone"
                        required
                        rules={[{ 
                            validator: (rule, value) => {
                                if(!value?.trim?.()) {
                                    return Promise.reject('请输入手机号码！');
                                }

                                const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                                if (!reg.test(value)) {
                                    return Promise.reject('请输入合法的手机号码！');
                                }
                        
                                return Promise.resolve();
                            } 
                        }]}
                    >
                        <Input placeholder='请输入手机号码' />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="gender"
                        rules={[{
                            required: true, 
                            message: '必填' 
                        }]}
                    >
                        <Radio.Group>
                            <Radio value='0'>男</Radio>
                            <Radio value='1'>女</Radio>
                            <Radio value='2'>保密</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="上传头像"
                        name="avatar"
                        rules={[{
                            required: true, 
                            message: '必填' 
                        }]}
                    >
                        <UploadImg 
                            downloadUrl='products/download'
                            fileNum={ 1 }
                            setFileListArr={ setFileListArr }
                            fileListArr={ toJS(fileListArr) }
                            disabled={ false }
                            delList={ toJS(delList) }
                            setDelList={ setDelList }
                        />
                    </Form.Item>

                    <Form.Item
                        label="生日"
                        name="birthday"
                        rules={[{
                            required: true, 
                            message: '必填' 
                        }]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    /**
     * 提交
     */
    handleSubmit = (values) => {
        const { fileListArr, delList, updateUserInfoData } = state;
        let formData = new FormData();
        let userInfo = {};
        
        values['birthday'] = moment(values['birthday']).format('YYYY-MM-DD');
        userInfo = {...values};

        if(!fileListArr.length){
            return message.error('上传头像，必传项！');
        }

        fileListArr.forEach((item, index) => {
            if( item.originFileObj ){
                formData.append('avatar', item.originFileObj);
            }else if( item.url ){
                let url = item.url.slice(item.url.indexOf('api/') + 4);
                formData.append('avatar', url);
            }
        });

        // 表单
        formData.append('userInfo', JSON.stringify(userInfo));
        // 存储被删图片
        formData.append('delList', JSON.stringify(delList));
        formData.append('uname', session.getItem('uname'));
        updateUserInfoData(formData);
    }
}

export default PersonalInformation;