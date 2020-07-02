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
                message.success("获取天气成功了")
            }else{
                reject(err)
                message.error("获取天气失败了")
            }
        })
    })
}
// ---------------------------------分类接口
// 6). 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax( '/manage/category/list',{parentId})
// 7). 添加一级分类
export const reqAddCategory = (categoryName) => ajax( '/manage/category/add', {categoryName}, 'POST')
//添加二级分类
export const reqAddCategoryT = (parentId, categoryName) => ajax( '/manage/category/add',{parentId, categoryName}, 'POST')
// 8). 更新品类名称
export const reqUpdateCategory = (categoryId, categoryName) => ajax( '/manage/category/update', {categoryId, categoryName}, 'POST')




//---------------------------------------商品接口
//10获取商品分页列表//页码和每页的条目数
export const reqshoplist=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})
//11根据ID/Name搜索产品分页列表,页码，每页条目数，根据商品名称搜索，根据商品描述搜索
export const reqshoplistbysearch=(pageNum,pageSize,productName,productType)=>ajax('/manage/product/search',{
    pageNum,pageSize,[productType]:productName
})
//12根据父id来获取自己分类
export const reqCate=(categoryId)=>ajax("/manage/category/info",{categoryId:categoryId})
//13添加和修改商品,父类id，父分类id，商品名称，商品描述，商品价格，商品详情，商品图片名数categoryId,pCategoryId,name,desc,price,detail,imgs
export const addShop=(product)=>ajax(`/manage/product/${product._id?'update':'add'}`,
product,"post")
//14对商品的上架和下架操作
export const updateStatus=(productId,status)=>ajax("/manage/product/updateStatus",{productId,status},'POST')
//15删除图片的接口
export const removeImg=(name)=>ajax("/manage/img/delete",{name},'POST')



//--------------------------角色接口
//16添加角色
export const reqRole=(roleName)=>ajax("/manage/role/add",{roleName},'POST')
//17获取角色列表
export const reqRoleList=()=>ajax("/manage/role/list")