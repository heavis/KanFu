/**
 * 路由器
 */
define(['jquery'], function($){
    var controllerPath = "controller", htmlPath = "html", mainHost = "main";


    var init = function(host, ctrpath, viewpath){
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

    return {
        init: init,
        redirect: redirect
    }
});