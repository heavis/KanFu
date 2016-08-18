/**
 * 登录逻辑.
 */

define(['jquery', 'route'], function($, route){
    var cur  = this;
    var host_ = undefined;
    //检查数据库环境是否准备完毕
    //window.sqlitePlugin.echoTest(function(result){
    //    console.log("数据库准备完毕.");
    //}, function(result){
    //    console.log("数据库未准备完毕.");
    //});
    //submit按钮注册事件
    var loadAfter = function(){
        $(host_).on("submit", "#loginForm", function(){
            var user = $.getFormJson(document.getElementById("loginForm"))
            //1.验证逻辑
            //2.使用wl和password链接服务器登录
            //var url = "http://192.168.1.11:8080/heavisoft.kanfu.server/kanfu/user?action=login";
            //$.post(url, {data: JSON.stringify(user)}).then(
            //    function(result){ //成功
            //        if(!result || !result.result ){
            //            navigator.notification.alert(result.data, "", "登录提示", "知道了");
            //            return;
            //        }
            //        var loginSuccessFunc = function(){
            //            //进入主界面
            //            route.redirect("main", "main");
            //            //navigator.notification.alert("登录成功.", "", "登录提示", "知道了");
            //        };
            //
            //        if(!result || !result.data){
            //            //登录成功，不走缓存session
            //            loginSuccessFunc();
            //            return;
            //        }
            //
            //        var sessionObj = JSON.parse(result.data);
            //        var session = sessionObj.session,
            //            lastModifyTime =sessionObj.lastModifyTime;
            //        //返回格式：session: '', lastModifyTime: ''
            //        var userTab = heavisoft.user();
            //        userTab.get(user.username, function(state, result){
            //            if(state){
            //                if(session && lastModifyTime){
            //                    if(result instanceof Array && result.length > 0){
            //                        userTab.update({
            //                            name: user.username,
            //                            session: session,
            //                            lastModifyTime: lastModifyTime
            //                        })
            //                    }else{
            //                        userTab.insert({
            //                            name: user.username,
            //                            session: session,
            //                            lastModifyTime: lastModifyTime
            //                        })
            //                    }
            //                }
            //            }
            //
            //            loginSuccessFunc();
            //        });
            //    }, function(){
            //        //失败
            //        //测试，进入主界面
            //        route.redirect("main", "main");
            //    });
            route.redirect("main", "main");

            return false;
        });
        $(host_).on("click", "#goRegist", function(){
            route.redirect("login", "regist");
        });
    }


    return {
        init:function(host){
            host_ = host;
        },
        execute: function(view){
            $(host_).load(view);
            loadAfter();
        }
    }
});
