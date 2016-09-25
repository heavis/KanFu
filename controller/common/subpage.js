/**
 * 子页面公共容器.
 */
define(['jquery', 'route'], function($, route){
    var subContentHost_ = "subPageConent", host_;
    var title_ = "";

    return {
        init:function(host){
            host_ = host;
    },
        loadBefore: function(){

        },
        execute: function(view, title){
            title_  = title;
            this.loadBefore();
            $(host_).load(view, null, this.loadAfter);

            return subContentHost_;
        },
        loadAfter: function(){
            if(title_){
                $(host_).find(".spage-head-title span").text(title_);
            }
        }
    }
});