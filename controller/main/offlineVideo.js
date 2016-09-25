/**
 * 离线视频
 */

define(['jquery', 'swipe', 'route', 'sqlite'], function($, swipe, route, sqlite){
    function loadData(){
        //从本地数据库获取video列表
        var videoTable = sqlite.video();
        videoTable.get(function(state, result){
            if(state){
                //动态数据展示
                var vue = new Vue({
                    el: "#mainContent",
                    data: {
                        videos: result
                    },
                    methods:{
                        playVideo: function(video){
                            route.redirectS("video", "offlineVideo", {title: video.name, video: video});
                            //window.plugins.streamingMedia.playVideo(video.src, {orientation: 'landscape'});
                        }
                    }
                });
            }
        });
    }

    return {
        init:function(host){
            host_ = host;
        },
        loadBefore: function(){

        },
        execute: function(view){
            this.loadBefore();
            $(host_).load(view, null, this.loadAfter);
        },
        loadAfter: function(){
            loadData();
        }
    }
});
