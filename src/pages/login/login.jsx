import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom' 

import './login.less'
import logo from "./images/lkpark_logo.png"
// import { reqLogin } from './../../api'
// import storageUtils from '../../utils/storageUtils.js'
// import memoryUtils from '../../utils/memoryUtils';
//redux
import {connect} from 'react-redux'
import { login } from '../../redux/actions';





class Login extends Component {

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields(async(err, values) => {
    //         if (!err) {
    //           console.log('Received values of form: ', values);
    //           const result= await reqLogin(values.username,values.password)
    //           if (result.status===0){
    //               //将user保存到local 
    //               const user = result.data
    //               storageUtils.saveUser(user)
    //               //保存到内存中
    //               memoryUtils.user=user
    //               //跳转到管理界面
    //               this.props.history.replace("/home")
    //               message.success(result.msg)
    //           }
    //         }else{
    //             alert("信息填写有误")
    //         }
    //       });

    // };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, {username,password}) => {
            if (!err) {
                this.props.login(username,password)
            }
          });

    };
    validpwd=(rule, value, callback)=>{
        //必须输入
        //大于12位
        //小于4位
        //英文数字下划线
        value=value.trim() //python的strip方法
        if (!value){
            callback('密码不能为空') 
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if (value.length>12){
            callback('密码不能大于12位')
        }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须由字母数字下划线组成")
        }else{
            callback() //验证通过
        }

    };

    render() {
        //验证用户是否以登录
        // const user=memoryUtils.user
        const user =this.props.user
        if (user._id){
            //this.props.histiory.replace('/login') //时间回调函数中进行路由跳转
            return <Redirect to="/" />
        }
        //const { getFieldDecorator } = this.props.form;
        const getFieldDecorator = this.props.form.getFieldDecorator; // 获取 getFieldDecorator JS属性对象，这个值的作用是帮助我们做表单封装
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>react学习 后台管理</h1>
                </div>
                <div className="login-content">
                    <img src="" alt="" />
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                initialValue: '',//默认值
                                rules: [
                                    
                                    { required: true, message: 'Please input your Password!' },
                                    { min:4, message: '用户名需要大于4位' },
                                    { max:12,  message: '用户名需要小于12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母数字下划线组成' },
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator:this.validpwd}
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )

    }
}
const WrappedNormalLoginForm = Form.create()(Login)//将Login函数包装 附上form属性
export default connect(
    state=>({
        user:state.user
    }),//一般属性 
    {login}//函数属性
)(WrappedNormalLoginForm) 