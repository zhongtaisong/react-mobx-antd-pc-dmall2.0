import React from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { UploadImg } from '@com';

/**
 * 上传商品图片
 */
class Index extends React.PureComponent<any, any> {
    render() {
        return (
            <Form.Item
                label="商品图片"
                name="goodsImg"
                rules={[{ 
                    required: true, 
                    message: '必传',
                    type: 'array',
                }]}
                extra="1、每张图片尺寸为546px * 546px；2、每张图片大小限制在2M以内；3、最多上传5张图片；4、第一张是主图，主图必传。"
            >
                {/* 上传商品大图 */}
                <UploadImg 
                    downloadUrl='products/download'
                    maxCount={ 5 }
                    // width={ [ 546 ] }
                    // height={ [ 546 ] }
                    {...this.props}
                />
            </Form.Item>
        );
    }
}

export default Index;