import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BackTop, Spin } from 'antd';
import { toJS } from 'mobx';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 全局设置
import { searchAreaState } from '@config';
// 各级页面路由
import RoutesList from '@router';
// 401、402、403、404
import ResultPages from '@pages/ResultPages';
// 搜索结果页面
import SearchResults from '@pages/SearchResults';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

function Bus() {
    return <h3>Bus</h3>;
  }

// 根页面
@observer
class Index extends React.Component<any, any> {

    componentWillMount() {        
        this.props.history && state.setHistory( this.props.history );
    }

    initDid = () => {
        state.oauthData();
        state.adminData();
    }

    componentDidMount() {
        this.initDid();
    }

    componentWillReceiveProps() {
        this.initDid();
    }

    render() {
        const { oauthCode, isLoading } = $state;
        const { isShowResultPage, searchResultList } = searchAreaState;
        console.log('6666666666', this.props)
        return (
            <div>
                <BackTop style={{ right: '60px', bottom: '60px' }} />
                <HeaderBar {...this.props} />
                <FooterCopyright {...this.props} />
            </div>
        );
    }
}

export default Index;