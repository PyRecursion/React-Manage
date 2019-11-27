import storageUtils from "../utils/storageUtils"
import { combineReducers } from "redux"
import { SET_HEADER_TITLE,RECEIVE_USER,SHOW_ERROR, LOGOUT} from "./action-types"




/*
管理状态数据的reducer函数
*/



/*
管理应用头部标题的reducer函数
*/
const initHeaderTitle='首页'
function headerTitle(state=initHeaderTitle,action){
    switch(action.type){
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
            
    }
}

/*
管理登录用户的reducer函数
*/

const initUser=storageUtils.getUser() //读取local中保存的数据作为初始值
function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR:
            return {...state,errorMsg:action.errorMsg}
        case LOGOUT:
            return {}
        default:
            return state
            
    }
}
/*
combineReducers()返回的是一个新的reducer函数
*/

const reducer=combineReducers({
    headerTitle,
    user
})

export default reducer
