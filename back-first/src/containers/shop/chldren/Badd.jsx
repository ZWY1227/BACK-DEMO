import React, { Component } from "react"
import { Card, Upload, message } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Select, Button } from 'antd';



const { Option } = Select
export default class Badd extends Component {
    onGoback = () => {
        console.log(this.props.history.goBack())
    }
    addOk=(vallue)=>{
        console.log(vallue)

    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    // ==================================
    state = {
        loading: false,
      };
    
      handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    render() {
        const title = (
            <div>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} onClick={this.onGoback} />
                <span>添加商品</span>
            </div>
        )
      
// ==============================上传
const uploadButton = (
    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const { imageUrl } = this.state;
            return (
                <Card title={title}>
                    <Form name="dynamic_rule" onFinish={this.addOk}>
                        <Form.Item
                            name="username"
                            label="商品名称"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input placeholder="Please input your name" />
                        </Form.Item>



                        <Form.Item name={['user', 'introduction']} label="商品描述" required='true' >
                            <Input.TextArea />
                        </Form.Item>



                        <Form.Item label="商品分类" required='true' name="cate">
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>
                        </Form.Item>
                        {/* 上传图片 */}

<Form.Item label="上传照片" name='pic'>
<Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
</Form.Item>






                        <Form.Item>
                            <Button type="primary" htmlType='submit'>提交</Button>
                        </Form.Item>
                    </Form>
                </Card>
            )
        }
    }

