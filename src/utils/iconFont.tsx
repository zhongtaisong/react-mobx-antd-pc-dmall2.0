import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
// icon
const IconFont = ({ type, ...other }) => {
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1455548_99z31b87yga.js',
    });
    return <IconFont type={ type } { ...other } />;
};

export default IconFont;