import React, { Component } from "react"
import { Card , List} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
export default class Bdetail extends Component {
    onGoback = () => {
        console.log(this.props.history.goBack())
    }
    render() {
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
                        <span>222</span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}

