/*
应用根组件
*/
import React, { Component } from 'react'


import {HashRouter,Switch,Route} from 'react-router-dom' //BrowserRouter去#Switch匹配到一项后不匹配
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'




export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Admin} />
                    
                </Switch>
            </HashRouter>
        )
    }
}
