/**
 * 设置闹钟
 */
define(['jquery'], function($){
    var  callback_ = null;

    return {
        init: function(){},
        loadBefore: function(){
            $("body").append("<div id='dialogTemplate' class='dialog-template'></div>");
        },
        execute: function(view, callback){
            callback_ = callback;
            this.loadBefore();
            $("#dialogTemplate").load(view, null, this.loadAfter);
        },
        loadAfter: function(){
            var wrapper = $("#dialogWrapper");
            //设置标题和内容
            wrapper.find(".dialog-title").text("闹钟设置");
            //按钮事件
            wrapper.find("#CancelBtn").click(function(event){
                $("#dialogTemplate").remove();
                if(callback_){
                    callback_(false);
                }
            }).end().find("#OkBtn").click(function(event){
                var hour = wrapper.find("#hourInput").val();
                var minute = wrapper.find("#minuteInput").val();
                if(hour && minute){
                    $("#dialogTemplate").remove();
                    callback_ && callback_({hour: hour, minute: minute});
                }
            });
        }
    }
});