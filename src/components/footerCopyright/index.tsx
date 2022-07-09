import React from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { FOOTER_MENU_LIST } from './data';
// less样式
import './index.less';

/**
 * 底部版权区域
 */
@observer
class FooterCopyright extends React.Component<any, any> {
    render() {
        return (
            <div className='dm_FooterCopyright'>
                <Row className='common_width'>
                    {
                        FOOTER_MENU_LIST.map(item01 => {
                            return (
                                <Col 
                                    key={ item01.id }
                                    span={ 8 } 
                                >
                                    <i>{ item01.title }</i>
                                    {
                                        item01?.content?.map?.(item02 => {
                                            return (
                                                <a 
                                                    key={ item02.cid }
                                                    target='_blank' 
                                                    href={ item02.url } 
                                                >{ item02.name }</a>
                                            )
                                        })
                                    }
                                </Col>
                            );
                        })
                    }
                </Row>

                <ul className='dm_FooterCopyright__copyright'> 
                    <li>闹钟太松了 - 2019/11/10 - 设计、开发、测试、上线</li>
                    <li>最近更新时间：{ new Date().toLocaleDateString() }</li>
                </ul>
            </div>
        );
    }
}

export default FooterCopyright;