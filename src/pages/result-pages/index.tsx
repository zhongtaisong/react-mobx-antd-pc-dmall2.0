import React from 'react';
import { observer } from 'mobx-react';
import { Result } from 'antd';
// less样式
import './index.less';

/**
 * 401、402、403、404等页面
 */
@observer
class ResultPages extends React.Component<any, any> {
    render() {
        return (
            <Result
                className='dm_ResultPages'
                status='404'
                title='404'
                subTitle='页面不存在'
                {...this.props}
            />
        );
    }
}

export default ResultPages;