/**
 * 更多
 */

define(['jquery', 'swipe', 'route', '../common/config'], function($, swipe, route, config){
    function loadData(){
        var result = [
            {picture: "assets/img/personal/info.png", title: "软件介绍", controller: "static", action: "info"},
            {picture: "assets/img/personal/message.png", title: "意见反馈", controller: "static", action: "suggestion"},
            {picture: "assets/img/personal/share.png", title: "分享", controller: "static", action: "share"}
        ];

        var vue = new Vue({
            el: "#mainContent",
            data: {
                menus: result
            },
            methods:{
                openMenu: function(menu){
                    route.redirectS(menu.controller, menu.action, {title: menu.title});
                }
            }
        });

        vue.$nextTick(function(){
            $(host_).data(view_, $(host_).children());
        });
    }

    var host_, view_;

    return {
        init:function(host){
            host_ = host;
        },
        loadBefore: function(){

        },
        execute: function(view){
            view_ = view;
            this.loadBefore();
            var cache = $(host_).data(view);
            if(cache){
                $(host_).children().detach();
                $(host_).append(cache);
            }else{
                $(host_).load(view, null, this.loadAfter);
            }
        },
        loadAfter: function(){
            loadData();
        }
    }
});
