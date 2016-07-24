/**
 * 子页面公共容器.
 */
define(['jquery', 'route'], function($, route){
    var subContentHost_ = "subPageConent";
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
                var selector = "#" + host_ + " .spage-head-title span";
                $(selector).text(title_);
            }
        }
    }
});