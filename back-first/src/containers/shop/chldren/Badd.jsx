import React, { Component } from "react"
import PicturesWall from "./upload"
import { Card, message} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Form, Input, Button, Cascader } from 'antd';
import "../../../../node_modules/react-umeditor/dist/less/editor.less"
import { reqCategorys,addShop } from '../../../Api/index'
import Editor from 'react-umeditor'
export default class Badd extends Component {
    constructor(props){
        super(props)
        this.myref=React.createRef()
    }
    getFirstList = async () => {
        let res = await reqCategorys()
        if (res.status === 0) {
            let firstList = res.data.map((item) => {
                let obj = {
                    value: item._id,
                    label: item.name,
                }
                return obj
            })
            firstList.map(async (key) => {
                let datas = await reqCategorys(key.value)
                let aaa = datas.data.map((result) => {
                    let objs = {
                        value: result._id,
                        label: result.name,
                    }
                    return objs
                })
                if (aaa.length) {
                    key.children = aaa
                }
                this.setState({
                    options: firstList
                })
            })
        }
    }
    componentDidMount() {
        this.getFirstList()
    }
    // 富文本编辑器的代码==
    getIcons() {
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }
    getQiniuUploader() {
        return {
            url: 'http://upload.qiniu.com',
            type: 'qiniu',
            name: "file",
            request: "image_src",
            qiniu: {
                app: {
                    Bucket: "liuhong1happy",
                    AK: "l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                    SK: "eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
                },
                domain: "http://o9sa2vijj.bkt.clouddn.com",
                genKey: function (options) {
                    return options.file.type + "-" + options.file.size + "-" + options.file.lastModifiedDate.valueOf() + "-" + new Date().valueOf() + "-" + options.file.name;
                }
            }
        }
    }
    //富文本结束
    onGoback =() => {
        console.log(this.props.history.goBack())
    }
    //点击添加商品ok
    addOk =async (value) => {
        //添加页面点击确定后发送添加请求
        let imgs=this.myref.current.getImage()//图片的所有信息
        let {pCategoryId,categoryId,content}=this.state//拿到俩ID，富文本数据
        let {name,desc,price} =value//名字，描述，价格
    console.log(categoryId,pCategoryId)
        let product={categoryId,pCategoryId,name,desc,price,detail:content,imgs}
        let result
        if(this.isEdit){//如果更新，需要传8个数据，多了一个_id
            let {_id,categoryId,pCategoryId}=this.product
            console.log(categoryId,pCategoryId)
            let productedit={categoryId,pCategoryId,_id,name,desc,price,detail:this.state.content,imgs}
            result=await addShop(productedit)
   
        }else{
            console.log(product,"11")
            result=await addShop(product)
        }
        if(result.status===0){
            this.props.history.replace("/admin/shop/two/Bshop")
            message.success(this.isEdit?'更新':'添加'+"商品成功") 
          }
    }
    // ==================================
    state = {
        loading: false,
        content: "",
        options: [],
        firstId: '',
        pCategoryId:"",//父Id
        categoryId:"",//二级分类Id
        newFileList:[]
    };
    // ---- 选择一级分类change事件
    onChange = (value) => {
        if(value.length===1){
        this.setState({
            pCategoryId:"0",
            categoryId:value[0]
        },()=>console.log(this.state.pCategoryId))
        }else{
            this.setState({
                pCategoryId:value[0],
                categoryId:value[1]
            },()=>console.log(this.state.pCategoryId))
        }
       
    }
    editor = (e) => {
        console.log(e,"11111")
        this.setState({
            content: e
        })
    }
    render() {
        //car的头
        let {product,isEdit}=this
        let {name,desc,price,pCategoryId,categoryId,imgs,detail}=product
        const title = (
            <div>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} onClick={this.onGoback} />
                <span>{isEdit?"编辑商品":"添加商品"}</span>
            </div>
        )
        //==富文本编辑的代码
        var icons = this.getIcons();
        var uploader = this.getQiniuUploader();
        var plugins = {
            image: {
                uploader: uploader
            }
        }
        var count = 100;
        var editors = [];
        for (var i = 0; i < count; i++) {
            editors.push({
                icons: icons,
                plugins: plugins
            })
        }
        //==富文本结束
        const { options } = this.state;
        return (
            <Card title={title} style={{ height: 710 }}>
                <Form name="dynamic_rule" onFinish={this.addOk} style={{ height: 360 }}>
                    <Form.Item
                        name="name"
                        label="商品名称"
                        required='true'
                        initialValue={isEdit?name:""}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="商品描述" required='true' name="desc"  initialValue={isEdit?desc:""}>
                        <Input.TextArea  placeholder="请输入商品描述" autoSize={{minRows:2,maxRows:2}}/>
                    </Form.Item>

                    <Form.Item label="商品价格" required='true' name="price"  initialValue={isEdit?price:""} >
                        <Input addonAfter="元" />
                    </Form.Item>

                    <Form.Item label="商品分类" required='true' name="cate" initialValue={isEdit?pCategoryId==="0"?[categoryId]:[pCategoryId,categoryId]:""}>
                        <Cascader
                            options={options}
                            expandTrigger="click"
                            onChange={this.onChange}
                        />
                    </Form.Item>
                    {/* 上传图片 */}
                    <Form.Item label="上传照片">
                       <PicturesWall setimages={isEdit?imgs:[]} ref={this.myref} ></PicturesWall>
                    </Form.Item>
                    <Form.Item style={{ position: "absolute", bottom: 0 }}>
                        <Button type="primary" htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
                <h4>商品详情：</h4>
                <Editor ref="editor"
                    icons={icons}
                    value={this.state.content}
                    defaultValue={isEdit?detail:""}
                    onChange={this.editor}
                />
            </Card>
        )
    }
    componentWillMount(){
        if(this.props.location.query){//表示传了参数，就是编辑，否则是添加
            let product=this.props.location.query.detail
            this.isEdit=!!product
            this.product=product
        }else{
            this.product={}
        } 
      }
    }