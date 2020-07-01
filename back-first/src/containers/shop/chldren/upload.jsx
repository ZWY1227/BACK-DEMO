import React from "react"
import {removeImg} from "../../../Api/index"
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async({file, fileList }) =>{
      if(file.status==="done"){
          if(file.response.status===0){
              message.success("上传图片成功")
              let {name,url} =file.response.data
              file=fileList[fileList.length-1]//拿到最后的图片
              file.name=name//添加一个属性name
              file.url=url//添加一个属性url
          }else{
              message.error("上传文件失败")
          }
      }else if(file.status==='removed'){
          let result=await removeImg(file.name)
          if(result.status===0){
              message.success("删除图片成功")
          }else{
              message.error("删除文件失败")
          }
      }
      this.setState({ fileList })
  };
  getImage=()=>{
    return this.state.fileList
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"//上传地址
          name="image"//文件名
          accept="image/*"//接受上传文件类型
          listType="picture-card"//上传列表内建样式
          fileList={fileList}//图片列表
          onPreview={this.handlePreview}//预览图标
          onChange={this.handleChange}//上传改变状态
        >
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
  componentDidMount(){
      if(this.props.setimages.length){
         this.setState({
             fileList:this.props.setimages
         })
      }
  }
}

