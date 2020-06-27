import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import 'antd/dist/antd.less'
import memory from "./util/memory"
import {getStor} from "./util/local"
memory.user=getStor()

ReactDOM.render(<App />,document.getElementById("root"))