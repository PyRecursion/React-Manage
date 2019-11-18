/*
操作local数据的工具函数模块
*/


export default {
    saveUser (user){
      localStorage.setItem('user_key',JSON.stringify(user))  
    },
    /*
    返回一个user对象，如果没有返回一个{}
    */
    getUser (){
        return JSON.parse(localStorage.getItem('user_key')||'{}')
    },
    removeUser (){
       localStorage.removeItem("user_key") 
    }
}