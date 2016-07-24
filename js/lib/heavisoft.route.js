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
    var redirectS = function(scope, controller, action, title){
        var scope_ = scope,
            controller_ = controller,
            action_ = action,
            title_ = "";

        if(!action){ //两个参数：controller, action
            scope_ = submainHost;
            controller_ = scope;
            action_ = controller;
        }else { //三个参数以上，包括三个参数
            if(!title){ //三个参数

            }else { //四个参数
                title_ = title;
            }
        }

        require(["../" + controllerPath + "/common/subpage"], function(ctr){
            if(ctr.init){
                ctr.init(document.getElementById(scope_));
            }
            if(ctr.execute){
                var view = htmlPath  + "/common/subpage.html";
                var contentId = ctr.execute(view, title);
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
                        })

                        require(["../" + controllerPath + "/" + controller_ + "/" + action_], function(ctr1){
                            if(ctr1.init){
                                ctr1.init(document.getElementById(contentId));
                            }
                            if(ctr1.execute){
                                var view = htmlPath  + "/" + controller_ + "/" + action_ + ".html";
                                ctr1.execute(view);
                            }
                        })
                    }

                    setTimeout(exchange, 500);
                }
            }
        })
    }

    return {
        init: init,
        redirect: redirect,
        redirectS: redirectS
    }
});