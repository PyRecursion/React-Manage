/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import { Modal } from 'antd';
import storageUtils from '../../utils/storageUtils';
import { withRouter } from 'react-router-dom';


import menuList from './../../config/menuConfig';

import {formateDate} from '../../utils/dateUtils.js'
import { reqWeather } from '../../api';
import { async } from 'q';



class Header extends Component {
    state={
        curTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    


    logout = () => {
        Modal.confirm({
            title: '确认退出吗？',
            onOk:()=> {
                console.log('OK');
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    getTitle=()=>{
        let title= ''
        const path=this.props.location.pathname
        menuList.forEach(item=>{
            if (item.key===path){
                title=item.title
            }else if (item.children){
                const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
            }
        })
        return title
    }
    

    getWeather=async()=>{
        const {dayPictureUrl, weather}=await reqWeather('杭州')
        this.setState({
            dayPictureUrl:dayPictureUrl,
            weather:weather
        })
    }


    componentDidMount(){
        this.intervalId=setInterval(() => {
            this.setState({
                curTime:formateDate(Date.now())
            })    
            
        }, 1000);
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {
        const {curTime,dayPictureUrl,weather}=this.state
        const user=memoryUtils.user
        const title=this.getTitle()
        return (
            <div className="header">
                <div className='header-top'>
                    欢迎，{user.username}
                    <span  onClick={this.logout}>退出</span>
                </div>
                <div className='header-bottom'>
        <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{curTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather} </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header) 