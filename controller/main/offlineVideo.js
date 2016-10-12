/**
 * 离线视频
 */

define(['jquery', 'swipe', 'route', 'sqlite', 'mobiscroll'], function($, swipe, route, sqlite){
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
                        },
                        setClock: function(video){

                            //route.setClock(function(result){
                            //    if(result){
                            //        var videoTable = sqlite.video();
                            //        videoTable.updateClock(result.hour + ":" + result.minute, video.id);
                            //    }
                            //});
                        }
                    }
                });
                vue.videos.forEach(function(video){
                    var id = '#videoItem' + video.id;
                    $(id).mobiscroll().time({
                        theme: "android-holo-light",      // Specify theme like: theme: 'ios' or omit setting to use default
                        lang: "zh",    // Specify language like: lang: 'pl' or omit setting to use default
                        display: "center",  // Specify display mode like: display: 'bottom' or omit setting to use default
                        mode: "datetimeTime",        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
                        headerText: false,             // More info about headerText: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-headerText
                        maxWidth: 90,                   // More info about maxWidth: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-maxWidth
                        onSet: function (event, inst) {
                            var valArr = inst.getArrayVal();
                            var videoTable = sqlite.video();
                            videoTable.updateClock(valArr[0] + ":" + valArr[1], video.id);
                        }
                    });
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
            $(host_).load(view, null, this.loadAfter);
        },
        loadAfter: function(){
            loadData();
        }
    }
});
