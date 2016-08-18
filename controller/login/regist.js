/**
 * 用户注册.
 */

define(['jquery', 'route'], function($, route){
    var cur  = this;
    var host_ = undefined;
    //submit按钮注册事件
    var loadAfter = function(){
        $(host_).on("submit", "#registForm", function(){
            var user = $.getFormJson(document.getElementById("registForm"));
            route.redirect("login", "login");

            return false;
        });
        $(host_).on("click", "#goLogin", function(){
            route.redirect("login", "login");
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
