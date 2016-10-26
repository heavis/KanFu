/**
 * 个人中心
 */

define(['jquery', 'swipe', 'route', '../common/config', 'sqlite'], function($, swipe, route, config, sqlite){
    function loadData(){
        //从本地数据库获取video列表
        var videoTable = sqlite.video();
        videoTable.get(function(state, result){
            if(state){
                var categories = [], keys = {};

                //动态数据展示
                if(result instanceof Array){
                    result.forEach(function(item){
                        if(!keys.hasOwnProperty(item.categoryName)){
                            keys[item.categoryName] = {videos: [], name: item.categoryName};
                            categories.push(keys[item.categoryName]);
                        }
                        keys[item.categoryName].videos.push(item);
                    });
                }
                var vue = new Vue({
                    el: "#subPageConent",
                    data: {
                        categories: categories
                    },
                    methods:{
                        playVideo: function(video){
                            window.plugins.streamingMedia.playVideo(video.src, {orientation: 'landscape'});
                        }
                    }
                });
                vue.$nextTick(function(){
                    $(host_).data(view_, $(host_).children());
                });
            }
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
