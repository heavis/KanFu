/**
 * 路由器
 */
define(['jquery'], function($){
    var controllerPath = "controller", htmlPath = "html", mainHost = "main", submainHost = "subPage";


    var init = function(host, subHost, ctrpath, viewpath){
        if(!viewpath){
            ctrpath = subHost;
            viewpath = ctrpath;
        }else{
            submainHost = subHost;
        }

        mainHost = host;
        controllerPath = ctrpath;
        htmlPath = viewpath;
    }

    /**
     * 三个参数：scope, controller, action
     * 两个参数：controller, action
     */
    var redirect = function(scope, controller, action){
        var scope_ = scope,
            controller_ = controller,
            action_ = action;

        if(!action){ //两个参数：controller, action
            scope_ = mainHost;
            controller_ = scope;
            action_ = controller;
        }

        //如果子页面没关闭，需要把子页面关闭了
        var $main = $("#" + mainHost), $subPage = $("#" + submainHost);
        if(!$subPage.hasClass("none")){
            $subPage.addClass("none");
        }
        if($main.hasClass("none")){
            $main.removeClass("none");
        }
        require(["../" + controllerPath + "/" + controller_ + "/" + action_], function(ctr){
            if(ctr.init){
                ctr.init(document.getElementById(scope_));
            }
            if(ctr.execute){
                var view = htmlPath  + "/" + controller_ + "/" + action_ + ".html";
                ctr.execute(view);
            }
        })
    }

    /**
     * 显示子页面
     * @param scope 宿主
     * @param controller
     * @param action
     */
    var redirectS = function(scope, controller, action, option){
        var scope_ = scope,
            controller_ = controller,
            action_ = action,
           option_ = option;

        if(!action){ //两个参数：controller, action
            scope_ = submainHost;
            controller_ = scope;
            action_ = controller;
            option_ = {};
        }else { //三个参数以上，包括三个参数
            if(!option_){ //三个参数
                scope_ = submainHost;
                controller_ = scope;
                action_ = controller;
                option_ = action;
            }else { //四个参数
            }
        }

        require(["../" + controllerPath + "/common/subpage"], function(ctr){
            if(ctr.init){
                ctr.init(document.getElementById(scope_));
            }
            if(ctr.execute){
                var view = htmlPath  + "/common/subpage.html";
                var contentId = ctr.execute(view, option_.title || "");
                if(contentId){
                    var exchange = function(){
                        var $main = $("#" + mainHost), $subPage = $("#" + submainHost);
                        if(!$main.hasClass("none")){
                            $main.addClass("none");
                        }
                        if($subPage.hasClass("none")){
                            $subPage.removeClass("none");
                        }
                        $subPage.on("click", ".spage-head-back img", function(){
                            if(!$subPage.hasClass("none")){
                                $subPage.addClass("none");
                            }
                            $(document.getElementById(contentId)).remove();
                            if($main.hasClass("none")){
                                $main.removeClass("none");
                            }
                        });

                        require(["../" + controllerPath + "/" + controller_ + "/" + action_], function(ctr1){
                            if(ctr1.init){
                                ctr1.init(document.getElementById(contentId), option_);
                            }
                            if(ctr1.execute){
                                var view = htmlPath  + "/" + controller_ + "/" + action_ + ".html";
                                ctr1.execute(view);
                            }
                        })
                    }

                    setTimeout(exchange, 100);
                }
            }
        })
    }

    /**
     * 弹出确认框
     * @param controller
     * @param action
     * @param title
     * @param content
     * @param callback
     */
    var confirm = function(title, content, callback){
        if(!callback){
            if(typeof content === "function"){
                callback = content;
                content = title;
                title = "提示";
            }
        }
        if(typeof content === "object"){
            content = {url: htmlPath  + "/" + content.controller + "/" + content.action + ".html"};
        }

        require(["../" + controllerPath + "/dialog/confirm"], function(ctr){
            if(ctr.init){
                ctr.init();
            }
            if(ctr.execute){
                var view = htmlPath  + "/dialog/confirm.html";
                ctr.execute(view, title, content, callback);
            }
        });
    }

    var setClock = function(callback){
        require(["../" + controllerPath + "/common/alarmClock"], function(ctr){
            if(ctr.init){
                ctr.init();
            }
            if(ctr.execute){
                var view = htmlPath  + "/common/alarmClock.html";
                ctr.execute(view, callback);
            }
        });
    }

    /**
     * 当前显示界面是否是主界面
     * @returns {boolean}
     */
    var isShowMainPage = function(){
        return !$("#" + mainHost).hasClass("none");
    }

    function closeSubPage(){
        $(".spage-head-back img").trigger("click");
    }

    return {
        init: init,
        redirect: redirect,
        redirectS: redirectS,
        dialog: {
            confirm: confirm
        },
        setClock:setClock,
        isShowMainPage: isShowMainPage,
        closeSubPage: closeSubPage
    }
});