import React from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { UploadImg } from '@com';

/**
 * 上传商品详情图片
 */
class Index extends React.PureComponent<any, any> {
    render() {
        return (
            <Form.Item
                label="商品详情图片"
                name="goodsDetailImg"
                rules={[{ 
                    required: true, 
                    message: '必传', 
                    type: 'array',
                }]}
                extra="1、每张图片宽度为750px，高度不限；2、每张图片大小限制在2M以内；3、最多上传5张图片。"
            >
                {/* 上传商品大图 */}
                <UploadImg 
                    downloadUrl='products/download'
                    maxCount={ 5 }
                    {...this.props}
                />
            </Form.Item>
        );
    }
}

export default Index;