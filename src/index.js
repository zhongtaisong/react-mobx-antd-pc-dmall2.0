import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, message } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import md5 from 'js-md5';
// 国际化设置
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

// less根样式
import './index.less';
moment.locale('zh-cn');

message.config({
    top: 36
});

React.Component.prototype.$md5 = md5;

ReactDOM.render(
    <ConfigProvider locale={ zhCN }>
        <App />
    </ConfigProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
