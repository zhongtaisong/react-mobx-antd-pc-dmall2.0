import React from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
// 全局公共方法
import { UploadImg } from '@com';
// ----------------------------------- 上传商品图片 ----------------------------------- //
@observer
class Index extends React.Component {
    render() {
        let { isDisabled, setFileListArr, fileListArr, delList, setDelList } = this.props;
        return (
            <Row>
                <Col span={ 24 }>
                    <div style={{ paddingBottom: '10px' }}>提示：每张图片尺寸为：546px * 546px；每张图片大小限制在2M以内；最多上传5张图片；第一张是主图，主图必传！</div>
                    {/* 上传商品大图 */}
                    <UploadImg 
                        downloadUrl='products/download'
                        fileNum={ 5 }
                        setFileListArr={ setFileListArr }
                        fileListArr={ fileListArr }
                        disabled={ isDisabled }
                        width={ [ 546 ] }
                        height={ [ 546 ] }
                        delList={ delList }
                        setDelList={ setDelList }
                        uploadText={ fileListArr.length ? `上传第${fileListArr.length+1}张图片` : '点击上传主图' }
                    />
                </Col>
            </Row>
        );
    }
}

export default Index;