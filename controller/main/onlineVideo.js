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
            //this.loadAfter();
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

            $(".main-video-item").click(function(event){
                route.redirectS("video", "onlineVideo");
            });
        }
    }
});
