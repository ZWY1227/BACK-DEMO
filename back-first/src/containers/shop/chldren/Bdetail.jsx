import React, { Component } from "react"
import { Card, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import {reqCate} from "../../../Api/index"
export default class Bdetail extends Component {
    state={
        name:"",
        nameson:""
    }
    onGoback = () => {
        console.log(this.props.history.goBack())
    }
    getcate=async(pCategoryId)=>{
        let result=await reqCate(pCategoryId)
        if(result.status===0){
            message.success("获取父级分类成功")
            let name=result.data.name
            this.setState({name})
        }else{
            message.error("获取父级分类失败")
        }
    }
    getcateson=async(categoryId)=>{
        let result=await reqCate(categoryId)
        if(result.status===0){
            message.success("获取父级分类成功")
            let nameson=result.data.name
            this.setState({nameson})
        }else{
            message.error("获取父级分类失败")
        }
    }
    render() {  
        let { imgs, _id, name, desc, price, detail, pCategoryId, categoryId } = this.props.history.location.query.detail
        const title = (
            <div>
                <ArrowLeftOutlined style={{ color: '#00aa98' }} onClick={this.onGoback} />
                <span>商品详情</span>
            </div>
        )

        return (
            <Card title={title}>
                <List>
                    <List.Item>
                        <h1>商品名称:</h1>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品描述:</h1>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品价格:</h1>
                        <span>￥{price}</span>
                    </List.Item>
                    <List.Item>
                        <h1>所属分类:</h1>
                        <span>{this.state.name}--&gt;{this.state.nameson}</span>
                    </List.Item>
                    <List.Item>
                        <h1>商品图片:</h1>
                        <div>
                            <img src={imgs[0].url} alt={imgs[0]}></img>
                        </div>
                    </List.Item>
                    <List.Item>
                        <h1>商品详情:</h1>
                        <div dangerouslySetInnerHTML={{__html:detail}} />
                    </List.Item>
                </List>
            </Card>
        )
    }
    componentDidMount(){
        let id=this.props.history.location.query.detail.pCategoryId
        let idson=this.props.history.location.query.detail.categoryId
        this.getcate(id)
        this.getcateson(idson)
    }
}

