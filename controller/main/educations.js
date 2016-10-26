/**
 * 知识宣教
 */

define(['jquery', 'swipe', 'route', '../common/config'], function($, swipe, route, config){
    function loadData(){
        var result = [
            {picture: "assets/img/educations/cervicals/1.png", title: "颈椎病", controller: "static", action: "cervical"},
            {picture: "assets/img/educations/cervicals/1.png", title: "颈椎病", controller: "static", action: "cervical"},
            {picture: "assets/img/educations/cervicals/1.png", title: "颈椎病", controller: "static", action: "cervical"},
            {picture: "assets/img/educations/cervicals/1.png", title: "颈椎病", controller: "static", action: "cervical"},
            {picture: "assets/img/educations/cervicals/1.png", title: "颈椎病", controller: "static", action: "cervical"}
        ];

        var vue = new Vue({
            el: "#mainContent",
            data: {
                educations: result
            },
            methods:{
                openEducationDetail: function(edu){
                    route.redirectS("static", "cervical", {title: edu.title});
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
