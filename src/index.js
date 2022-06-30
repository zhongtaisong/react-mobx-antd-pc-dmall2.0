import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, message } from 'antd';
import App from './App';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ zhCN }>
        <App />
    </ConfigProvider>
  </React.StrictMode>
);
