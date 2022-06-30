import React from 'react';
import { Typography, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 个人信息
import PersonalInformation from './components/PersonalInformation';
// 修改登录密码
import LoginPassword from './components/LoginPassword';
// 收货地址
import ReceivingAddress from './components/ReceivingAddress';
// 数据
import state from './state';
// less样式
import './index.less';
const { Option } = Select;

// 用户中心
@observer
class UserCenter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 1
        };
    }

    componentDidMount() {
        state.selectUserInfoData();
    }

    // 监听下拉菜单
    handleChange = (value) => {
        this.setState({ key: value });
    }

    render() {
        const { key } = this.state;
        const { personalInformation, setPersonalInformation, avatar } = state;
        return (
            <div className='common_width dm_UserCenter'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>用户中心</Typography.Title>
                    <Select defaultValue={ key } onChange={ this.handleChange }>
                        <Option value={ 1 }>个人资料</Option>
                        <Option value={ 2 }>修改登录密码</Option>
                        <Option value={ 3 }>收货地址</Option>
                    </Select>
                </Row>
                <Row style={{ padding: '10px 0' }}>
                    {/* 个人资料 */}
                    {
                        key == 1 ? (
                            <PersonalInformation 
                                personalInformation={ toJS(personalInformation) } 
                                setPersonalInformation={ setPersonalInformation }
                                avatar={ toJS(avatar) }
                            />
                        ) : ''
                    }
                    {/* 修改登录密码 */}
                    {
                        key == 2 ? (
                            <LoginPassword 
                                {...this.props}
                                loginPassword={ toJS( state.loginPassword ) }
                                setLoginPassword01={ state.setLoginPassword01 }
                            />
                        ) : ''
                    }
                    {/* 收货地址 */}
                    {
                        key == 3 ? (
                            <ReceivingAddress />
                        ) : ''
                    }
                </Row>
            </div>
        );
    }
}

export default UserCenter;