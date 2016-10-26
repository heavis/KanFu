/**
 * 颈椎病
 */

define(['jquery', 'swipe', 'route', '../common/config'], function($, swipe, route, config){
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
        }
    }
});
