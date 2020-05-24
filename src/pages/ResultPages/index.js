import React from 'react';
import { observer } from 'mobx-react';
import { Result, Button } from 'antd';
// less样式
import './index.less';

// 401、402、403、404等页面
@observer
class ResultPages extends React.Component {

    // 跳转到目标页面
    goTargetPage = () => {
        this.props.history.replace('/');
    }

    render() {
        return (
            <Result
                status='404'
                title='404'
                subTitle='很抱歉，没找到页面！'
                extra={ <Button type="primary" onClick={ this.goTargetPage }>返回首页</Button> }
                className='dm_ResultPages common_width'
            />
        );
    }
}

export default ResultPages;