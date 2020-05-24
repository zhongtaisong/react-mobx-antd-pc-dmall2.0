import React from 'react';
import { Form, message } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

// 登录
import Logins from './components/Logins';
// 忘记密码
import ForgetPassword from './components/ForgetPassword';
// 新密码
import NewPassword from './components/NewPassword';
// 设置
import { indexState, PWD_KEY } from '@config';
// 背景图片
import bigImg from '@img/register/bg.png';
// logo图片
import logoImg from '@img/logo2.png';
// 数据
import state from './state';
// less样式
import './index.less';

const loginBg = {
    background: `url(${bigImg}) no-repeat`,
    backgroundSize: 'cover'
};

// 登录、忘记密码、新密码
@observer
class Login extends React.Component {

    // code: 0表示登录组件，1忘记密码组件，2新密码组件
    constructor(props) {
        super(props);
        this.state = {
            code: 0
        };
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
        indexState.oauthData();
    }

    // 登录
    loginSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.upwd = this.$md5( values.upwd + PWD_KEY );
                // 0表示不记住密码， 1表示记住密码
                values.isRemember = values.isRemember && values.isRemember.length ? 1 : 0;
                state.loginData( values );
            }
        });
    };

    // 跳转忘记密码组件
    handleTarget = (that) => {
        if( that === 'forget' ){
            this.setState({
                code: 1
            });
        }else if( that === 'newPwd' ){
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    values.uname = values.uName;
                    delete values.uName;
                    const code = await state.forgetPwdData( values );
                    if( code === 200 ){
                        this.setState({
                            code: 2
                        });
                    }
                }
            });
        }else if( that === 'submit' ){
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    const { uPwd, confirm } = values || {};
                    if( uPwd != confirm ) {                        
                        message.error('新密码和确认密码不一致！');
                    }else{
                        let newUpwd = this.$md5( values.confirm + PWD_KEY );
                        const code = await state.newPwdData({ newUpwd });
                        if( code === 200 ){
                            this.setState({
                                code: 0
                            });
                        }
                    }
                }
            });
        }else{
            this.setState({
                code: 0
            });
        }
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { code } = this.state;
        return (
            <div className='dm_Login'>
                <div className='common_width logo'>
                    <Link to='/' title='首页'>
                        <img src={ logoImg } alt='logo' />
                    </Link>
                </div>
                <div className='content' style={ loginBg }>
                    {
                        code === 0 ? (
                            <Logins 
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget }  
                                loginSubmit={ this.loginSubmit }
                            />
                        ) : code === 1 ? (
                            <ForgetPassword 
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget }  
                            />
                        ) : code === 2 ? (
                            <NewPassword 
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget } 
                            />
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);