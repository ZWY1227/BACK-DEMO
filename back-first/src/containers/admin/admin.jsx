import React,{Component} from "react"
import { Button , message} from 'antd';
import 'antd/dist/antd.less'
export default class Admin extends Component{
    // render(){
    //     return(
    //         <div>
    //             <p>admin组件</p>
    //             <Button type="primary">hahah</Button>
    //         </div>
    //     )
    // }
    handleClick = ()=>{
        message.success('成功啦')
    }
    render(){
        return (
            <Button type="primary" onClick={this.handleClick}>测试antd</Button>
            
    
            )
    }

}