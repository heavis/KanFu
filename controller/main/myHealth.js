/**
 * 我的康复
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
        }
    }
});
