import React from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
// 登录 - 表单
import Logins from './components/logins';
// 忘记密码 - 表单
import ForgetPassword from './components/forget-password';
// 新密码
import NewPassword from './components/new-password';
// 设置
import { indexState, PWD_KEY } from '@config';
// logo图片
import logoImg from '@img/logo2.png';
// 数据
import state from './state';
// less样式
import './index.less';

interface IComponentState {
    /**
     * 组件code
     * 
     * 0登录表单，1忘记密表单，2新密码表单
     */
    code: 0 | 1 | 2;
}


/**
 * 登录、忘记密码、新密码
 */
@observer
class Login extends React.Component<Partial<RouteComponentProps>, IComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            code: 0
        };
    }

    componentDidMount() {
        indexState.oauthData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { code } = this.state;
        const layout = [1, 2].includes(code) ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        } : {};

        return (
            <div className='dm_Login'>
                <div className='dm_Login__content' >
                    <Form 
                        {...layout}
                        autoComplete='off'
                        onFinish={ this.onFinish }
                    >
                        <Link 
                            to='/' 
                            className='dm_Login__logo'
                        >
                            <img src={ logoImg } alt='logo' />
                        </Link>
                        { 
                            code === 0 && (
                                <Logins 
                                    handleTarget={() => {
                                        this.setState({
                                            code: 1
                                        });
                                    }} 
                                /> 
                            )
                        }
                        { 
                            code === 1 && (
                                <ForgetPassword 
                                    handleTarget={() => {
                                        this.setState({
                                            code: 0
                                        });
                                    }} 
                                /> 
                            )
                        }
                        { 
                            code === 2 && (
                                <NewPassword 
                                    handleTarget={() => {
                                        this.setState({
                                            code: 0
                                        });
                                    }} 
                                /> 
                            )
                        }
                    </Form>
                </div>
            </div>
        );
    }

    /**
     * 提交表单
     * @param values 表单信息
     * @returns 
     */
    onFinish = (values) => {
        const { code } = this.state;
        if(!values || !Object.keys(values).length) return;
        
        if(code === 0) {
            return state.loginData({
                ...values,
                upwd: (window as any).$md5(values?.upwd + PWD_KEY),
                isRemember: Number(values?.isRemember),
            }, () => {
                this.props.history.replace("/");
            });
        }
        
        if(code === 1) {
            values['uname'] = values.uName;
            delete values.uName;

            return state.forgetPwdData(values).then(status => {
                if(status === 200) {
                    this.setState({
                        code: 2
                    });
                }
            });
        }
        
        if(code === 2) {
            state.newPwdData({ 
                newUpwd: (window as any).$md5( values.confirm + PWD_KEY ),
            }).then(status => {
                if(status === 200) {
                    this.setState({
                        code: 0
                    });
                }
            });
        }
    };
}

export default Login;