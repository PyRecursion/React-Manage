import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import ProductHome from './home'
import Detail from './detail'
import AddUpdate  from './addupdate'

import './product.less'

export default class Product extends Component {
    render() {
        return (
                <Switch>
                    <Route path='/product/detail' component={Detail} />
                    <Route path='/product/addupdate' component={AddUpdate}/>
                    <Route path='/product' component={ProductHome} />
                    <Redirect to="/product" />
                </Switch>
        )
    }
}
