/**
 * 系统配置
 */
define(function(){
    return {
        SERVER_HOST: "http://192.168.1.2:8080",
        URL_LOGIN:"/heavisoft.kanfu.server/kanfu/user?action=login",
        URL_USER_VALIDATE: "/heavisoft.kanfu.server/kanfu/user?action=validate",
        URL_USER_REGIST: "/heavisoft.kanfu.server/kanfu/user?action=add",
        USER_GET_CAGETORY: "/heavisoft.kanfu.server/kanfu/video?action=category",
        USER_GET_VIDEO: "/heavisoft.kanfu.server/kanfu/video?action=video"
    }
});
