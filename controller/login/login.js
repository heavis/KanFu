/**
 * 登录逻辑.
 */

define(['jquery', 'route', 'sqlite', '../common/config', 'validate', 'message_zh', '../mock/ajax'], function($, route, sqlite, config){
    var cur  = this;
    var host_ = undefined;
    //检查数据库环境是否准备完毕
    //window.sqlitePlugin.echoTest(function(result){
    //    console.log("数据库准备完毕.");
    //}, function(result){
    //    console.log("数据库未准备完毕.");
    //});
    //submit按钮注册事件
    var loadAfter = function() {
        /*$(host_).on("click", "#goRegist", function () {
            route.redirect("login", "regist");
        });

        var submitFormFunc = function(){
            var user = $.getFormJson(document.getElementById("loginForm"))
            //1.验证逻辑
            //2.使用wl和password链接服务器登录
            $.ajax({url: config.SERVER_HOST + config.URL_LOGIN, data: JSON.stringify(user), timeout: 5000}).done(function (result) {
                    if (!result) {
                        navigator.notification.alert("登录失败了", "", "登录提示", "知道了");
                        return;
                    }

                    if (!result.result) {
                        navigator.notification.alert(result.data, "", "登录提示", "知道了");
                        return;
                    }
                    var loginSuccessCallback = function () {
                        //进入主界面
                        route.redirect("main", "main");
                        //navigator.notification.alert("登录成功.", "", "登录提示", "知道了");
                    };

                    if (result && !result.data) {
                        //登录成功，不走缓存session
                        loginSuccessCallback();
                        return;
                    }

                    var sessionObj = typeof result.data === "string" ?  JSON.parse(result.data) : result.data;
                    var session = sessionObj.session,
                        lastModifyTime = sessionObj.lastModifyTime;
                    //返回格式：session: '', lastModifyTime: ''
                    var userTab = sqlite.user();
                    userTab.get(user.username, function (state, result) {
                        if (state) {
                            if (session && lastModifyTime) {
                                //更新或者插入session信息到user表
                                userTab[result.length > 0 ? "update" : "insert"]({
                                    name: user.username,
                                    session: session,
                                    lastModifyTime: lastModifyTime
                                });
                                //更新current表
                                var curTab = sqlite.current();
                                curTab.get(function (result, data) {
                                    if (result) {
                                        curTab[data.length > 0 ? "update" : "insert"]({name: user.username, userId: 0});
                                    }
                                });
                            }
                        }

                        loginSuccessCallback();
                    });
                }
            ).fail(function () { //登录失败
                navigator.notification.alert("登录失败了", "", "登录提示", "知道了");
            });
        }

        //校验表单设置
        $("#loginForm").validate({
            errorPlacement: function(error, element) {
                error.insertAfter(element.parents(".lg-input-parent"));
            },
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 16
                }
            },
            submitHandler:function(form){
                submitFormFunc();
            }
        }); */
        route.redirect("main", "main");
    }

    return {
        init:function(host){
            host_ = host;
        },
        execute: function(view){
            $(host_).load(view, null, loadAfter);
        }
    }
});
