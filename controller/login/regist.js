/**
 * 用户注册.
 */

define(['jquery', 'route', '../common/config', '../common/global', '../mock/ajax'], function($, route, config, global){
    var cur  = this;
    var host_ = undefined;
    //submit按钮注册事件
    var loadAfter = function(){
        //$(host_).on("submit", "#registForm", function(){
        //    var user = $.getFormJson(document.getElementById("registForm"));
        //    route.redirect("login", "login");
        //
        //    return false;
        //});
        $(host_).on("click", "#goLogin", function(){
            route.redirect("login", "login");
        });

        function submitFormFunc(){
            var user = $.getFormJson(document.getElementById("registForm"));
            //调用接口注册
            global.ajax({url: config.SERVER_HOST + config.URL_USER_REGIST, data: user}).done(function(result){
                if(result){
                    navigator.notification.alert(result.data, "", "登录提示", "知道了");
                    route.redirect("login", "login");
                }
            }).fail(function(result){
               if(result){
                   navigator.notification.alert(result.data, "", "登录提示", "知道了");
               }
            });
        }

        //校验表单设置
        $("#registForm").validate({
            errorPlacement: function(error, element) {
                error.insertAfter(element.parents(".lg-input-parent"));
            },
            rules: {
                username: {
                    required: true,
                    remote: config.SERVER_HOST + config.URL_USER_VALIDATE
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 16
                },
                repeatPassword:{
                    equalTo: "#password"
                }
            },
            messages: {
                username: {
                    remote: jQuery.validator.format("用户已存在!")
                }
            },
            submitHandler:function(form){
                submitFormFunc();
            }
        });
    }

    return {
        init:function(host){
            host_ = host;
        },
        execute: function(view){
            $(host_).load(view, null, loadAfter);
        },
        loadAfter: loadAfter
    }
});
