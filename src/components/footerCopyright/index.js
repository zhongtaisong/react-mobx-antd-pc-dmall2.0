import React from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
// less样式
import './index.less';

const footerData = [
    { id: 1, title: 'Demo Mall', 
        content: [
            { cid: 1, url: '/views/web', name: '网站说明' },
            { cid: 2, url: '/views/message', name: '留言' }
        ]
    },
    { id: 2, title: '相关技术栈', 
        content: [
            { cid: 1, url: 'https://www.html.cn/create-react-app/docs/getting-started/', name: 'create-react-app' },
            { cid: 2, url: 'https://cn.mobx.js.org/', name: 'mobx' },
            { cid: 3, url: 'https://cn.mobx.js.org/', name: 'antd' }
        ]
    },
    { id: 3, title: '技术社区', 
        content: [
            { cid: 1, url: 'https://juejin.im/', name: '掘金' },
            { cid: 2, url: 'https://segmentfault.com/', name: 'SegmentFault 思否' },
            { cid: 3, url: 'https://github.com/', name: 'GitHub' },
            { cid: 4, url: 'https://www.csdn.net/', name: 'CSDN' }
        ]
    },
    // { id: 4, title: '合作联系', 
    //     content: [
    //         { cid: 1, url: '/', name: '微信' },
    //         { cid: 2, url: '/', name: 'QQ' },
    //         { cid: 3, url: '/', name: '新浪邮箱' }
    //     ]
    // },
]

// 底部版权区域
@observer
class FooterCopyright extends React.Component {

    render() {
        return (
            <div className='dm_FooterCopyright'>
                <Row className='common_width'>
                    {
                        footerData.map(item01 => {
                            return (
                                <Col span={ 8 } key={ item01.id }>
                                    <i>{ item01.title }</i>
                                    {
                                        item01.content.map(item02 => {
                                            return (
                                                <a target='_blank' href={ item02.url } key={ item02.cid }>{ item02.name }</a>
                                            )
                                        })
                                    }
                                </Col>
                            );
                        })
                    }
                </Row>
                <div className='copyright'>                    
                    <div className='common_width'>
                        闹钟太松了 2019-11-10 设计、开发、测试、上线
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterCopyright;