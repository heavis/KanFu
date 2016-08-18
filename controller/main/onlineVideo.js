/**
 * 在线视频
 */

define(['jquery', 'swipe', 'route'], function($, swipe, route){
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
            var bullets = document.getElementById('position').getElementsByTagName('li');
            var slider =
                swipe(document.getElementById('slider'), {
                    auto: 3000,
                    continuous: true,
                    callback: function(pos) {
                        var i = bullets.length;
                        while (i--) {
                            bullets[i].className = ' ';
                        }
                        bullets[pos].className = 'on';

                    }
                });

            $(".video-item-image").click(function(event){
                route.redirectS("video", "onlineVideo");
            });
            //下载视频
            $(".video-item-download").on("click", function(event){
                route.dialog.confirm("下载视频", "请确认是否下载视频？", function(result){
                    if(result){

                    }
                });
            });
            //设置闹钟
            $(".video-item-clock").on("click", function(event){
                route.alarmClock(function(result){
                    if(result){
                        alert(result.hour + ":" + result.minute);
                    }
                });
            });
        }
    }
});
