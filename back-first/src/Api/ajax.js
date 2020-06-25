//实现对axios的封装，
import axios from "axios"
import {message} from "antd"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise
        if(type==="GET"){
            promise=axios.get(url,{params:data})
        }else{
            promise=axios.post(url,data)
        }
        promise.then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            reject(err)
            message.error("访问接口出错了")
        })
    })
}