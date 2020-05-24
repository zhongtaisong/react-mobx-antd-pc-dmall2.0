import React, { Fragment } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { observer } from 'mobx-react';
// 全局设置
import { PUBLIC_URL } from '@config';
// 图片格式
const imgFormat = ['image/jpeg', 'image/png'];

// 上传图片
@observer
class UploadImg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dUrl: null,
            previewVisible: false,
            previewImage: ''
        };
    }

    // url转为base64
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // 预览
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }    
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 取消预览
    handleCancel = () => this.setState({ previewVisible: false });
  
    // 上传过程中
    handleChange = async ({ file={}, fileList=[] }) => {
        const { type, size, status } = file;
        const { setFileListArr, width, height, ifSize=true } = this.props;
        
        if( !setFileListArr ){
            message.error('缺少setFileListArr方法！');
            return;
        }
        if( width && Array.isArray(width) && !width.length ){
            message.error('width是以数组形式传入值，而且数组不能为空！');
            return;
        }
        if( height && Array.isArray(height) && !height.length ){
            message.error('height是以数组形式传入值，而且数组不能为空！');
            return;
        }

        // 校验图片格式
        if( type ){
            const isJpgOrPng = imgFormat.includes( type );
            if ( !isJpgOrPng ) {
                message.error('上传的图片格式不对，请重新上传！');
                return;
            }
        }

        // 校验图片大小
        if( size ){
            const isLt2M = size / 1024 / 1024 < 2;
            if ( !isLt2M ) {
                message.error('上传的图片大小超过2M，请重新上传！');
                return;
            }
        }

        // 校验图片尺寸
        if( !status ){
            let isSize = await this.checkSize(file, width, height);
            if( !isSize ) return;
        }
        setFileListArr( fileList );
    }

    // 校验图片尺寸
    checkSize = (file, width, height) => {
        return new Promise((resolve, reject) => {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            if( file.originFileObj ){
                img.src = _URL.createObjectURL(file.originFileObj);
            }else{
                img.src = _URL.createObjectURL(file);
            }
            img.onload = () => {
                if( width && height ){
                    if( !width.includes(img.width) || !height.includes(img.height) ){
                        message.error(`图片尺寸不对，宽width高height为${ width.join(' 或 ') }！`);
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                }else if( width ){
                    if( !width.includes(img.width) ){
                        message.error(`图片尺寸不对，宽width为${ width.join(' 或 ') }！`);
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                }else if( height ){
                    if( !height.includes(img.height) ){
                        message.error(`图片尺寸不对，高height为${ height.join(' 或 ') }！`);
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                }else{
                    resolve(true);
                }
            };
        });
    }

    // 上传之前
    beforeUpload = (file) => {
        const { type, size } = file;
        // 校验图片格式
        const isJpgOrPng = imgFormat.includes( type );
        if ( !isJpgOrPng ) {
            message.error('只能上传jpg、jpeg、png格式图片！');
        }

        // 校验图片大小
        const isLt2M = size / 1024 / 1024 < 2;
        if ( !isLt2M ) {
            message.error('图片大小必须小于2MB！');
        }
        return false;
    };

    // 删除
    onRemove = (file) => {
        let { delList, setDelList, setFileListArr, fileListArr } = this.props;
        if( !delList ){
            message.error('缺少delList参数，delList是用来存储被删图片的信息！');
            return;
        }
        if( !setDelList ){
            message.error('缺少setDelList方法！');
            return;
        }
        if( !setFileListArr ){
            message.error('缺少setFileListArr方法！');
            return;
        }
        let { uid, url } = file;
        if( url ){
            url = url.slice(url.indexOf('api/') + 4);
            setDelList( [...delList, url] );
        }
        fileListArr = fileListArr.filter(item => item.uid != uid);
        setFileListArr( fileListArr );
    }

    // 下载
    onDownload = (file) => {
        let { url } = file || {};
        url = url.slice(url.indexOf('api/') + 4);
        const { downloadUrl } = this.props;
        if( !downloadUrl ){
            message.error('缺少downloadUrl参数！');
            return;
        }
        this.setState({
            dUrl: `${PUBLIC_URL}${downloadUrl}?url=${url}&num=${Math.random()}`
        });
    }

    render() {
        const { previewVisible, previewImage, dUrl } = this.state;
        let { disabled=false, fileNum=1, fileListArr=[], uploadText } = this.props;
        return (
            <Fragment>
                <Upload
                    {...this.props}
                    listType="picture-card"
                    fileList={ fileListArr }
                    onPreview={ this.handlePreview }
                    onChange={ this.handleChange }
                    beforeUpload={ this.beforeUpload }
                    onRemove={ this.onRemove }
                    onDownload={ this.onDownload }
                    disabled={ disabled }
                >
                    {
                        fileListArr.length >= fileNum || disabled ? null : (
                            <div>
                                <Icon type="plus" style={{ fontSize: '20px' }} />
                                {
                                    uploadText ? (
                                        <div className="ant_upload_text">{ uploadText }</div>
                                    ) : ''
                                }
                            </div>
                        )
                    }
                </Upload>
                <Modal visible={ previewVisible } footer={ null } onCancel={ this.handleCancel }>
                    <img alt="example" style={{ width: '100%' }} src={ previewImage } />
                </Modal>
                <iframe src={ dUrl } frameBorder={ 0 } style={{ display: 'none' }}></iframe>
            </Fragment>
        );
    }
}

export default UploadImg;