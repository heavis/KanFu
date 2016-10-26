/**
 * 软件信息
 */

define(['jquery', 'swipe', 'route', '../common/config'], function($, swipe, route, config){
    function loadData(){
        var result = {
            icon: "assets/img/logo.png",
            desc: "为了病人更好的康复，提供各方面康复视频、知识宣教。",
            author: "王雷",
            support: "四川大学华西医院康复医学中心"
        };

        var vue = new Vue({
            el: "#subPageConent",
            data: {
                info: result
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
