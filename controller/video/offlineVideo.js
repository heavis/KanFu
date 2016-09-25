/**
 * 在线视频播放
 */
define(['jquery', 'route', '../common/config', 'hivideo'], function($, route, config, hivideo){
    var host_, option_;

    return {
        init:function(host, option){
            host_ = host;
            option_ = option || {};
        },
        loadBefore: function(){

        },
        execute: function(view){
            this.loadBefore();
            $(host_).load(view, null, this.loadAfter);
        },
        loadAfter: function(){
            var video = option_.video;
            if(video){
                //vue加载数据
                var vue = new Vue({
                    el: "#subPageConent",
                    data: {
                        video: video
                    }
                });
            }

            //视频控制
            var video = hivideo(document.getElementById("videoPlayer"));
            video.on("fullscreenchange", function(event){
                if(video.isFullScreen()){
                    Fullscreen && Fullscreen.on();
                }else{
                    Fullscreen && Fullscreen.off();
                }
            });
        }
    }
});
