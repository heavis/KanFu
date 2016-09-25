/**
 * 用户中心.
 */

define(['jquery', 'route', 'sqlite'], function($, route, sqlite){
    var cur  = this;
    var host_ = undefined;
    //submit按钮注册事件
    var loadAfter = function(){
        $(host_).on("click", "#logoutBtn", function(){
            //退出当前用户
            var currentDb = sqlite.current();
            currentDb.get(function(state, result){
                if(state && result.length > 0){
                    var currentUser = result[0];
                    currentDb.delete(function(state){
                        if(state){
                            var userDb = sqlite.user();
                            userDb.delete(currentUser.name, function(state){
                                if(state){
                                    route.redirect("login", "login");
                                }
                            });
                        }
                    });
                }else{
                    route.redirect("login", "login");
                }
            });
        });
    }

    return {
        init:function(host){
            host_ = host;
        },
        execute: function(view){
            $(host_).load(view, null, loadAfter);
        },
        loadAfter: loadAfter
    }
});

