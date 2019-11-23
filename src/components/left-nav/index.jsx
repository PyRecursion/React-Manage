import React, { Component } from 'react'
import './index.less'
import logo from './images/FCBlogo.png'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig.js'






const { SubMenu } = Menu;


class LeftNav extends Component {
    //reduce方法
    
    
    getMenuNodes2 = (menuList) => {
         //请求路径
        const path=this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                /*
                当前item的key是否是我需要的openkey
                查找item的所有children中cItem的key，看是否有和请求的path匹配
                */
                const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openkey=item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes2(item.children)
                        }
                    </SubMenu>
                )

            }
            return pre
        }, [])
    }

    //map方法
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        })

    }
    /*
    第一次renders之后执行一次
    场景：执行异步任务 ，发ajax请求，启动定时器
    */
    componentDidMount(){

    }
    /*
    第一次渲染之前执行一次
    为第一次render做一些同步的准备
    */
    UNSAFE_componentWillMount(){
        this.menulist=this.getMenuNodes2(menuList)
    }

    render() {
        
        //得到当前请求的路由路径
        let selectkey=this.props.location.pathname
        if (selectkey.indexOf('/product')===0){
            selectkey='/product'
        }
        return (
            
            <div className="left-nav">
                <Link className="left-nav-header" to="/home">
                    <img src={logo} alt="logo" />
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    // defaultSelectedKeys={[selectkey]}
                    selectedKeys={[selectkey]}
                    defaultOpenKeys={[this.openkey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menulist}
                    {/* <Menu.Item key="1">
                        <Link className="left-nav-home" to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Icon type="home" />
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                        <Link to="/home">
                            <Icon type="home" />
                            <span>商品管理</span>
                        </Link>

                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span></span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}


/*
向外暴露 使用高阶组件withRouter包装非路由组件
使其具有属性：history /location/match
使其可以操作相关语法
*/
export default withRouter(LeftNav)