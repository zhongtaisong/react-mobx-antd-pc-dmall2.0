import React from 'react';
import { Form, Button, Radio, message } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
import {FormInstance} from 'antd/es/form';
import { RouteComponentProps } from 'react-router-dom';
import { PWD_KEY } from '@config';
import { cacheKey } from '@utils';
// 个人信息
import PersonalInformation from './components/personal-information';
// 修改登录密码
import LoginPassword from './components/login-password';
// 收货地址
import ReceivingAddress from './components/receiving-address';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 用户中心
 */
@observer
class UserCenter extends React.PureComponent<RouteComponentProps, {
    /**
     * 当前菜单key
     */
    menuKey: "personalInformation" | "loginPassword" | "receivingAddress";
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            menuKey: "personalInformation",
        };
    }

    componentDidMount() {
        this.init();
    }

    render() {
        const { menuKey } = this.state;
        const { setFileListArr, fileListArr } = state;
        return (
            <div className='common_width dm_UserCenter'>
                <div className='dm_UserCenter__title'>
                    <Radio.Group
                        defaultValue={ menuKey }
                        onChange={e => {
                            const key = e?.target?.value;
                            if(key === 'personalInformation') {
                                this.init();
                            }
                            this.setState({ menuKey: key },);
                        }}
                    >
                        <Radio.Button value="personalInformation">个人资料</Radio.Button>
                        <Radio.Button value="loginPassword">修改登录密码</Radio.Button>
                        <Radio.Button value="receivingAddress">收货地址</Radio.Button>
                    </Radio.Group>
                </div>
                
                <div className='dm_UserCenter__content'>
                    {
                        menuKey !== "receivingAddress" ? (
                            <div className='dm_UserCenter__content--form'>
                                <Form 
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 20 }}
                                    autoComplete="off"
                                    ref={ this.formRef }
                                    onFinish={ this.onFinish }
                                >
            
                                    {/* 个人资料 */}
                                    {
                                        menuKey === "personalInformation" && (
                                            <PersonalInformation 
                                                fileListArr={ toJS(fileListArr) } 
                                                onUploadCallBack={(val) => {
                                                    if(!Array.isArray(val) || !val.length) {
                                                        this.formRef.current.resetFields(["avatar"]);
                                                    }else {
                                                        this.formRef.current.setFieldsValue({
                                                            "avatar": val
                                                        });
                                                    }
                                                    setFileListArr(val);
                                                }}
                                            />
                                        )
                                    }
            
                                    {/* 修改登录密码 */}
                                    {
                                        menuKey === "loginPassword" && (
                                            <LoginPassword />
                                        )
                                    }
            
                                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                                        <Button type="primary" htmlType="submit">提交</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        ) : (
                            <ReceivingAddress />
                        )
                    }
                </div>
            </div>
        );
    }

    /**
     * 初始化
     */
    init = () => {
        state.selectUserInfoData().then(res => {
            this.formRef.current.setFieldsValue({...res});
        });
    }

    /**
     * 更新 - 个人资料 - 操作
     * @param values 
     * @returns 
     */
    updateUserInfoDataFn = (values) => {
        const formData = new FormData();
        const { avatar } = values || {};
        if(!avatar) {
            return message.error("请上传头像！");
        }else if(Array.isArray(avatar)) {
            if(!avatar.length) {
                return message.error("请上传头像！");
            }else {
                const { originFileObj } = avatar?.[0] || {};
                formData.append('avatar', originFileObj || {});
            }
        }else if(typeof avatar === 'string') {
            formData.append('avatar', avatar);
        }

        // 表单
        formData.append('userInfo', JSON.stringify({
            ...values,
            birthday: moment(values['birthday']).format('YYYY-MM-DD'),
        }));
        state?.updateUserInfoData?.(formData);
    }

    /**
     * 更新 - 登录密码 - 操作
     * @param values 
     * @returns 
     */
     updateUpwdDataFn = (values) => {
        state.updateUpwdData({
            oldUpwd: (window as any).$md5(values?.oldUpwd + PWD_KEY),
            newUpwd: (window as any).$md5(values?.newUpwd + PWD_KEY),
        }).then(bol => {
            if(bol) {
                localStorage.removeItem(cacheKey.USER_INFO);
                sessionStorage.removeItem(cacheKey.USER_INFO);
                this.props.history.push("/login");
            }
        });
    }

    /**
     * 表单提交 - 操作
     */
     onFinish = (values) => {
        if(!values || !Object.keys(values).length) return;

        const { menuKey } = this.state;
        if(menuKey === 'personalInformation') {
            return this.updateUserInfoDataFn(values);
        }

        if(menuKey === 'loginPassword') {
            return this.updateUpwdDataFn(values);
        }

        if(menuKey === 'receivingAddress') {
            return this.updateUserInfoDataFn(values);
        }
    }
}

export default UserCenter;