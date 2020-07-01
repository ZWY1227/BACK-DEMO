import React,{Component} from "react"
import Badd from "./chldren/Badd"
// import Bedit from "./chldren/Bedit"
import Bshop from "./chldren/BShop"
import Bdetail from "./chldren/Bdetail"
import {Route,Switch} from "react-router-dom"

export default class Two extends Component{
    render(){
        return(
            <Switch>
                <Route path="/admin/shop/two/Bshop" component={Bshop}></Route>
                <Route path="/admin/shop/two/Badd" component={Badd}></Route>
                {/* <Route path="/admin/shop/two/Bedit" component={Bedit}></Route> */}
                <Route path="/admin/shop/two/Bdetail" component={Bdetail}></Route>
                <Route path="/admin/shop/two" component={Bshop}></Route>
            </Switch>
        )
    }
}