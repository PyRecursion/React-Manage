import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'  //重定向组件
//import localst from '../../utils/storageUtils.js'
// import memoryUtils from '../../utils/memoryUtils.js'
import { Layout } from 'antd';
import LeftNav from './../../components/left-nav/index';
import Header from './../../components/header/index';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

import {connect} from 'react-redux'




const { Footer, Sider, Content } = Layout;

class admin extends Component {
    render() {
        // const user=localst.getUser()
        // const user = memoryUtils.user
        const user=this.props.user
        if (!user._id) {
            //this.props.histiory.replace('/login') //时间回调函数中进行路由跳转
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ backgroundColor:'	white',margin:'20px'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', lineHeight: "100%", color: 'rgba(0,0,0,0.5)' }}>推荐使用谷歌浏览器获得页面最佳体验</Footer>
                </Layout>
            </Layout>
        )
    }
}


export default connect(
    state=>({user:state.user}),
    {}
)(admin)