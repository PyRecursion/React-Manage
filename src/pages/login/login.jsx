import React, { Component } from 'react'



import './login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from "./images/lkpark_logo.png";


class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
            else{
                alert("星系填写有误")
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
export default WrappedNormalLoginForm