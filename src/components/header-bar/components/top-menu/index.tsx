import React from 'react';
import { Popover, ConfigProvider } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { SketchPicker } from 'react-color';
import { commonFn } from '@utils';
import { MENU_LIST } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 顶部菜单
 */
@observer
class TopMenu extends React.Component<Partial<RouteComponentProps>, {
    /**
     * 是否展示登录、注册
     */
    isLoginAndRegister: boolean;
}> {

    constructor(props) {
        super(props);
        this.state = {
            isLoginAndRegister: !commonFn?.isLogin?.(),
        };
    }

    render() {
        const { pathname } = this.props.location;
        const { admin, uname } = commonFn?.getUserInfo?.() || {};
        const { isLoginAndRegister } = this.state;

        return (
            <div className='dm_topMenu'>
                <div className='common_width dm_topMenu__content'>
                    <div className='dm_topMenu__content--left'>
                        { uname ? `欢迎您，${ uname }` : null }
                    </div>
                    { !pathname.includes('/views/admin') && (
                        <div className='dm_topMenu__content--right'>
                            {
                                isLoginAndRegister ? (
                                    <>
                                        <span onClick={() => this.props.history.push('/login')}>登录</span>
                                        <span onClick={() => this.props.history.push('/register')}>注册</span>
                                    </>
                                ) : (
                                    <span onClick={ this.logoutFn }>退出登录</span>
                                )
                            }
                            {
                                MENU_LIST.map(item => {
                                    if([6].includes(item.key)) {
                                        if(admin !== '1') {
                                            return null;
                                        }
                                    };

                                    return (
                                        <span key={ item.key }
                                            onClick={() => this.intoTargetPage(item)}
                                        >{ item.name }</span>
                                    );
                                })
                            }
                            <Popover
                                overlayClassName='dm_topMenu__popover'
                                placement="bottom"
                                content={
                                    <SketchPicker
                                        presetColors={['#1890ff', '#25b864', '#ff6f00']}
                                        color={ `var(--dm-main-color)` }
                                        onChange={ this.onColorChange }
                                    />
                                }
                            >
                                <div className='dm_topMenu__content--right__theme'>
                                    <div style={{ background: `var(--dm-main-color)`}} />
                                    <span>主题色</span>
                                </div>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /**
     * 退出登录 - 操作
     */
    logoutFn = () => {
        state.logoutData(() => {
            this.setState({ isLoginAndRegister: true });
        });
    }

    /**
     * 跳转到目标页面
     * @param obj 菜单Object
     */
    intoTargetPage = (obj: {
        key: number;
        name: string;
        pathName?: string;
    }) => {
        if(!obj || !Object.keys(obj).length) return;
        const { pathName } = obj;
        const { history } = this.props;
        const isLogin = commonFn?.isLogin?.()

        if(!isLogin) {
            return history.push('/login');
        }

        return pathName && history.push(pathName);
    }

    /**
     * 监听 - 拾色器操作
     */
    onColorChange = ({ hex }) => {
        ConfigProvider.config({
          theme: {
            primaryColor: hex,
            errorColor: hex,
            warningColor: hex,
            successColor: hex,
            infoColor: hex,
          },
        });

    }

}

export default TopMenu;