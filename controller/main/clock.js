/**
 * 个人中心
 */

define(['jquery', 'swipe', 'route', '../common/config', 'sqlite'], function($, swipe, route, config, sqlite){
    function getVideo(categories, id){
        var video;

        categories.forEach(function(cg){
            cg.videos.forEach(function(video){

            })
        });

        return video;
    }

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
                        cancelClock: function(video){
                            //取消闹钟
                            video.clock = "";
                            videoTable.updateClock(video.clock, video.id);
                            cordova.plugins.notification.local.clear(video.id, function() {});
                        }
                    }
                });
                vue.categories.forEach(function(cg){
                    cg.videos.forEach(function(video){
                        var id = '#videoItemS' + video.id;
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
                                video.clock = valArr[0] + ":" + valArr[1];

                                cordova.plugins.notification.local.clear(video.id, function() {});
                                var date = new Date();
                                date.setHours(valArr[0]);
                                date.setMinutes(valArr[1]);
                                cordova.plugins.notification.local.schedule({
                                    id: video.id,
                                    title: "视频播放提醒",
                                    text: video.name,
                                    every: "day",
                                    at:date,
                                    sound: "file://res/sound/message.mp3", //对应目录 www/res/sound/message.mp3
                                    data: { id: video.id }
                                });
                            }
                        });
                    });
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
