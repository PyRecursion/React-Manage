import storageUtils from "./storageUtils";

export default{
    user:storageUtils.getUser(),//用来存储登录用户信息，默认没有登陆,初始位local中读取的user
}



