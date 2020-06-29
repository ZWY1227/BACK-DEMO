import React, { Component } from "react"
import { Table, Card, Button,Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from "../../../components/Button/ButtonLink"
import { Link } from "react-router-dom";

export default class Bshop extends Component {
    detail=()=>{
        this.props.history.push("/admin/shop/two/Bdetail")

    }
    edit=()=>{
        this.props.history.push("/admin/shop/two/Bedit")
    }
    render() {
        const { Option } = Select;
        const extra = (
            <span>
            <Link to="/admin/shop/two/Badd">
                <Button type='primary' onClick={this.clickHandle}><PlusOutlined />添加</Button>
            </Link>
            </span>
        )
        const title = (
            <span>
                <Select value="按名称搜索"style={{ margin: '0 18px' }}>
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                </Select>
                <Input type="text" placeholder="关键字" style={{ width: 100 }} />
                <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                    搜索
                </Button>
            </span>
        )
        const dataSource = [
            {
                key: '1',
                name: '电脑',
                sub:'华为',
                price:'100'
              },
              {
                key: '1',
                name: '手机',
                sub:'华为',
                price:'200'
              }
        ];

        const columns = [
            {
                title: '商品名称',
                dataIndex:'name'
            },
            {
                title: '商品描述',
                dataIndex:'sub'
            },
            {
                title: '价格',
                dataIndex:'price'
            },
            {
                title: '状态',
                render: () => {
                    return (
                        <span>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: '10' }}>
                                下架
                            </Button><br />
                           <div>在售</div>
                        </span>
                    )
                }
            },
            {
                title: "操作",
                render:()=>{
                    return(
                        <div>
                         <LinkButton onClick={()=>{this.detail()}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.edit()}}>修改</LinkButton>
                        </div>
                       
                    )
                }
            }

        ];
        return (
            <Card type="inner" title={title} extra={extra}>
                <Table dataSource={dataSource} columns={columns} />;
            </Card>
        )
    }
}