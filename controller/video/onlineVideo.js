/**
 * 在线视频播放
 */
define(['jquery', 'route'], function($, route){
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
        }
    }
});
