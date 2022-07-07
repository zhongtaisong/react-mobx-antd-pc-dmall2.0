import React from 'react';
import { Row, Col, message, Popover, ConfigProvider } from 'antd';
import { observer } from 'mobx-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

interface IComponentState {
    /**
     * 主题色配置
     */
    color: {
        [key: string]: string;
    },
}

// 顶部菜单
@observer
class TopMenu extends React.Component<any, IComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            color: {
                primaryColor: '#1890ff',
            },
        }
    }

    // 跳转到目标页面
    intoTargetPage = (that) => {
        const { oauthCode, admin } = $state;
        if( that == 'login' ){
            this.props.history.push('/login');
        }else if( that == 'register' ){
            this.props.history.push('/register');
        }else if( that == 'logout' ){
            state.logoutData();
        }else{
            if( oauthCode && oauthCode != 401 ){
                if( that == 'admin' ){
                    if( admin == 1 ){
                        this.props.history.push(`/views/${that}`);
                    }else{
                        message.error('您不是管理员，无权进入后台！');
                    }
                }else{
                    this.props.history.push(`/views/${that}`);
                }
            }else{
                message.error('尚未登录，无法访问该页面！点击logo跳转首页');
                this.props.history.replace('/login');
            }
        }
    }

    render() {
        const { uname, admin } = $state;
        const { pathname } = this.props.location;
        const { color } = this.state;

        return (
            <div className='dm_topMenu'>
                <Row className='common_width'>
                    <Col span={ 1 }>
                        <EnvironmentOutlined style={{ paddingRight: '4px' }} />
                        南京
                    </Col>
                    <Col span={ 23 }>
                        {
                            uname ? (
                                <>
                                    <span>欢迎你，{ uname }</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'logout') }>退出登录</span>
                                </>
                            ) : (
                                <>
                                    <span onClick={ this.intoTargetPage.bind(this, 'login') }>登录</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'register') }>注册</span>
                                </>
                            )
                        }
                        {
                            !pathname.includes('/views/admin') ? (
                                <>
                                    <span onClick={ this.intoTargetPage.bind(this, 'order') }>我的订单</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'collection') }>我的收藏</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'user') }>用户中心</span>
                                    {
                                        admin == 1 ? (
                                            <span onClick={ this.intoTargetPage.bind(this, 'admin') }>商城后台</span>
                                        ) : ''
                                    }
                                </>
                            ) : ''
                        }
                        <Popover
                            overlayClassName='dm_topMenu__popover'
                            content={
                                <SketchPicker
                                    presetColors={['#1890ff', '#25b864', '#ff6f00']}
                                    color={ color?.primaryColor }
                                    onChange={ this.onColorChange }
                                />
                            }
                        >
                            <span>更改主题</span>
                        </Popover>
                    </Col>
                </Row>
            </div>
        );
    }

    /**
     * 监听 - 拾色器操作
     */
    onColorChange = ({ hex }) => {
        const { color } = this.state;

        this.setState({
            color: {
                ...color,
                primaryColor: hex,
            },
        })

        ConfigProvider.config({
          theme: {
            primaryColor: hex,
          },
        });

    }

}

export default TopMenu;