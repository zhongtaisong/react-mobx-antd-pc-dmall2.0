import React from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { UploadImg } from '@com';
// ----------------------------------- 上传商品详情图片 ----------------------------------- //
@observer
class Index extends React.Component {
    render() {
        let { isDisabled, setFileListArr, fileListArr, delList, setDelList } = this.props;
        return (
            <Row>
                <Col span={ 24 }>
                    <div style={{ paddingBottom: '10px' }}>提示：每张图片宽度为：750px，高度不限；每张图片大小限制在2M以内；最多上传5张图片</div>
                    {/* 上传商品大图 */}
                    <UploadImg 
                        downloadUrl='products/download'
                        fileNum={ 5 }
                        setFileListArr={ setFileListArr }
                        fileListArr={ fileListArr }
                        disabled={ isDisabled }
                        delList={ delList }
                        setDelList={ setDelList }
                        uploadText='点击上传详情图'
                    />
                </Col>
            </Row>
        );
    }
}

export default Index;