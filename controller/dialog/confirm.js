/**
 * 弹出确认框
 */
define(['jquery', 'route'], function($, route){
    var title_ =  content_ =  "", callback_ = null;

    return {
        init: function(){},
        loadBefore: function(){
            $("body").append("<div id='dialogTemplate' class='dialog-template'></div>");
        },
        execute: function(view, title, content, callback){
            title_ = title || title_;
            content_ = content || content_;
            callback_ = callback || callback_;



            this.loadBefore();
            $("#dialogTemplate").load(view, null, this.loadAfter);
        },
        loadAfter: function(){
            var wrapper = $("#dialogWrapper");
            //设置标题和内容
            wrapper.find(".dialog-title").text(title_);
            if(typeof content_ === "object"){
                wrapper.find(".dialog-content-wrap").remove(".dialog-content-span").load(content_.url);
            }else{
                wrapper.find(".dialog-content-span").text(content_);
            }
            //按钮事件
            wrapper.find("#CancelBtn").click(function(event){
                $("#dialogTemplate").remove();
                if(callback_){
                    callback_(false);
                }
            }).end().find("#OkBtn").click(function(event){
                $("#dialogTemplate").remove();
                if(callback_){
                    callback_(true);
                }
            });
        }
    }
});