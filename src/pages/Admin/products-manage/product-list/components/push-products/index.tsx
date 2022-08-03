import React from 'react';
import { Form, Select } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { UploadImg } from '@com';

/**
 * 推广商品
 */
class Index extends React.PureComponent<any, any> {

    // banner推广选择是时，展示banner上传入口
    watchBanner = (value, option) => {
        const { setIsUpload } = this.props;
        if( value == 103 ){
            setIsUpload && setIsUpload( true );
        }else if( value == 13 ){
            setIsUpload && setIsUpload( false );
        }
    }

    render() {
        let { setFileListArr, fileListArr, delList, setDelList, isDisabled=false, isUpload=false } = this.props;

        return (
            <>
                <Form.Item 
                    label='热门推荐'
                    name="hot"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                    }]}
                >
                    <Select placeholder="请选择" >
                        <Select.Option value={ 101 }>是</Select.Option>
                        <Select.Option value={ 11 }>否</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='单品推广'
                    name="single"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                    }]}
                >
                    <Select placeholder="请选择" >
                        <Select.Option value={ 102 }>是</Select.Option>
                        <Select.Option value={ 12 }>否</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='大图推广'
                    name="banner"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                    }]}
                >
                    <Select placeholder="请选择" >
                        <Select.Option value={ 103 }>是</Select.Option>
                        <Select.Option value={ 13 }>否</Select.Option>
                    </Select>
                </Form.Item>

                {
                    isUpload ? (
                        <Form.Item>
                            <div style={{ padding: '10px 0' }}>提示：每张图片宽度为：1098px，高度不限；每张图片大小限制在2M以内；最多上传1张图片</div>
                            {/* 上传商品大图 */}
                            <UploadImg 
                                downloadUrl='products/download'
                                maxCount={ 1 }
                                onUploadCallBack={ setFileListArr }
                                fileListArr={ fileListArr }
                                disabled={ isDisabled }
                                uploadText='点击上传banner'
                            />
                        </Form.Item>
                    ) : null
                }
            </>
        );
    }
}

export default Index;