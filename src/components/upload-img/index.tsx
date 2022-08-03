import React from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// 全局设置
import { PUBLIC_URL } from '@config';
import { commonFn } from '@utils';

interface IComponentProps {
    /**
     * 图片列表
     */
    fileListArr?: Array<any>;
    /**
     * 图片宽度 - 多个
     */
    width?: Array<number>;
    /**
     * 图片高度 - 多个
     */
    height?: Array<number>;
    /**
     * 是否禁用上传功能
     */
    disabled?: boolean;
    /**
     * 最多能上传几张图片
     */
    maxCount?: number;
    /**
     * 上传提示文案
     */
    uploadText?: string;
    /**
     * 上传图片 - 回调函数
     */
    onUploadCallBack?: Function;
    /**
     * 下载链接
     */
    downloadUrl?: string;
}

interface IComponentState {
    /**
     * 下载链接
     */
    downloadUrl: string;
    /**
     * 预览Modal是否可见
     */
    isVisible: boolean;
    /**
     * 预览图片url
     */
    previewImageUrl: string;
    /**
     * 图片列表
     */
    fileList: Array<any>;
}

/**
 * 上传图片
 */
class UploadImg extends React.PureComponent<IComponentProps, IComponentState> {

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            downloadUrl: props.downloadUrl,
            isVisible: false,
            previewImageUrl: null,
            fileList: props.fileListArr || [],
        };
    }

    /**
     * 预览图片 - 操作
     * @param file 
     */
    handlePreview = async (file) => {
        let previewImageUrl = file?.thumbUrl;

        if(!previewImageUrl) {
            previewImageUrl = await commonFn.fileToBase64(file.originFileObj);
        }    
        this.setState({
            previewImageUrl,
            isVisible: true,
        });
    };

    /**
     * 取消预览 - 操作
     * @returns 
     */
    handleCancel = () => this.setState({ isVisible: false });

    /**
     * 上传之前 - 操作
     * @param file 
     * @returns 
     */
    beforeUpload = async (file) => {
        const { onUploadCallBack, width, height } = this.props;
        const { fileList } = this.state;

        // 校验图片大小
        const isLt2M = file?.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小必须小于2MB！');
            return false;
        }

        // 校验图片尺寸
        const result = await commonFn.checkSize(file, width, height);
        if(result) {
            message.error(result);
            return false;
        }

        const thumbUrl = await commonFn.fileToBase64(file);
        const new_fileList = [
            ...fileList,
            {
                name: file.name,
                status: 'done',
                thumbUrl,
                url: null,
            },
        ];
        this.setState({ 
            fileList: new_fileList,
        }, () => {
            onUploadCallBack?.(new_fileList);
        });

        return false;
    };

    /**
     * 删除 - 操作
     */
    onRemove = () => {
        const { onUploadCallBack } = this.props;
        this.setState({ 
            fileList: [],
        }, () => {
            onUploadCallBack?.([]);
        });
    }

    /**
     * 下载 - 操作
     * @param file 
     * @returns 
     */
    onDownload = (file) => {
        const { downloadUrl } = this.props;
        if(!downloadUrl) return;

        let { url } = file || {};
        url = url?.slice?.(url.indexOf('api/') + 4) || url;
        this.setState({
            downloadUrl: `${PUBLIC_URL}${downloadUrl}?url=${url}&num=${Math.random()}`
        });
    }

    render() {
        const { isVisible, previewImageUrl, downloadUrl, fileList } = this.state;
        const { disabled, maxCount, uploadText } = this.props;

        return (
            <>
                <Upload
                    listType="picture-card"
                    fileList={ fileList }
                    onPreview={ this.handlePreview }
                    beforeUpload={ this.beforeUpload }
                    onRemove={ this.onRemove }
                    onDownload={ this.onDownload }
                    disabled={ disabled }
                    maxCount={ maxCount }
                    accept="image/png, image/jpeg"
                >
                    {
                        fileList.length < maxCount && (
                            <>
                                <PlusOutlined />
                                { uploadText ? ( <div className="ant_upload_text">{ uploadText }</div> ) : '' }
                            </>
                        )
                    }
                </Upload>

                <Modal visible={ isVisible } footer={ null } onCancel={ this.handleCancel }>
                    <img alt="example" style={{ width: '100%' }} src={ previewImageUrl } />
                </Modal>

                <iframe src={ downloadUrl } frameBorder={ 0 } style={{ display: 'none' }}></iframe>
            </>
        );
    }
}

export default UploadImg;