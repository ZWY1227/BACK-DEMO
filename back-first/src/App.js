import React, { Component } from "react"
import Login from "./containers/login/login"
import Admin from "./containers/admin/admin"
import 'antd/dist/antd.less'
import "../src/style.css"




import { BrowserRouter, Route, Switch } from "react-router-dom"
export default class App extends Component {
    render() {
        return (
            <div id="rootson">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Admin}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route component={Login}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
} 