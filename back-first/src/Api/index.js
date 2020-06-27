import ajax from "./ajax"
import jsonp from "jsonp"
import {message} from "antd"
//登录的接口
export const reqlogin=(username,password)=>ajax("/login",{username,password},"POST")
//封装获取天气的接口，需要使用第三方的接口，用jsonp
export const reqweather=(city)=>{
    return new Promise((resolve,reject)=>{
        let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            if(data.status==="success"){
                let weather=data.results[0].weather_data[0].weather
                let url=data.results[0].weather_data[0].dayPictureUrl
                resolve({weather,url})
            }else{
                reject(err)
                message.error("获取天气失败了")
            }
        })
    })
}
