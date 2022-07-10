import React from 'react';
import { Row, Col, Popover, ConfigProvider } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import { MENU_LIST } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

/**
 * 顶部菜单
 */
@observer
class TopMenu extends React.Component<Partial<RouteComponentProps>, any> {
    render() {
        const { uname, admin } = $state;
        const { pathname } = this.props.location;

        return (
            <div className='dm_topMenu'>
                <Row className='common_width dm_topMenu__content'>
                    <Col span={ 2 } className='dm_topMenu__content--left'>
                        <EnvironmentOutlined style={{ paddingRight: '4px' }} />
                        南京
                    </Col>
                    { !pathname.includes('/views/admin') && (
                        <Col span={ 22 } className='dm_topMenu__content--right'>
                            {
                                MENU_LIST.map(item => {
                                    if(uname) {
                                        if([0, 1].includes(item.key)) {
                                            return null;
                                        }
                                    }else {
                                        if([2].includes(item.key)) {
                                            return null;
                                        }
                                    }

                                    if([6].includes(item.key)) {
                                        if(admin !== 1) {
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
                        </Col>
                    )}
                </Row>
            </div>
        );
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
        const { key, pathName } = obj;
        const { oauthCode } = $state;
        const { history } = this.props;
        const isAuth = oauthCode && oauthCode !== 401;

        if([0, 1].includes(key)) {
            return pathName && history.push(pathName);
        }

        if(key === 2) {
            return state.logoutData();
        }

        if(!isAuth) {
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