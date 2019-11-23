import storageUtils from "./storageUtils";
const user=storageUtils.getUser()
export default{
    user,//用来存储登录用户信息，默认没有登陆,初始位local中读取的user
    product:{},//需要查看的商品对象
}



