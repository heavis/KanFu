/**
 * 个人中心
 */

define(['jquery', 'swipe', 'route', '../common/config'], function($, swipe, route, config){
    function loadData(){
        var result = [
            {picture: "assets/img/personal/account.png", title: "个人训练", controller: "main", action: "training"},
            {picture: "assets/img/personal/clock.png", title: "闹钟", controller: "main", action: "clock"}
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
