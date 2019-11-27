import { SET_HEADER_TITLE ,RECEIVE_USER,SHOW_ERROR,LOGOUT} from "./action-types";
import { reqLogin } from "../api"
import storageUtils from "../utils/storageUtils";

/*
包含n个用于创建action对象、函数的工厂函数(action creator)
*/


/*
设置头部标题的action
*/
export const setHeaderTitle=(headerTitle)=>({
    type:SET_HEADER_TITLE,
    data:headerTitle
})

/*
接受用户的同步action
 */

export const receiveUser=(user)=>({type:RECEIVE_USER,user})


/*
显示错误信息的同步action 
*/

export const showError=(errorMsg)=>({type:SHOW_ERROR,errorMsg});


/*
退出登录的同步action 
*/
export const logout=()=>{
    //删除local中的user 
    storageUtils.removeUser()
    //返回一个action对象
    return {type:LOGOUT}
}

/*
登陆的异步action 
*/

export function login(username,password) {
    return async dispatch=>{
        const result=await reqLogin(username,password)
        if (result.status===0){
            const user=result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const msg=result.msg
            dispatch(showError(msg))
        }      
    }
  }

