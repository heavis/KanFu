/**
 * 主界面.
 */

define(['jquery', 'swipe', 'route', 'regular', '../common/global', 'mobiscroll',  '../mock/ajax'], function($, swipe, route, regular, global, mobiscroll){
    var host_ = undefined;
    //初始化菜单
    function initMenu(){
        //mobiscroll设置
        mobiscroll.settings = {
            theme: 'android-holo-light',  // Specify theme like: theme: 'ios' or omit setting to use default
            lang: 'zh'                    // Specify language like: lang: 'pl' or omit setting to use default
        };
        //导航菜单
        $(".menu-wrap").on("click", ".main-menu", function(event){
            var menu = $(this);
            if(menu.hasClass("selected")){
                return;
            }
            var  menuParent = menu.parent();
            //移出之前选中的样式
            menuParent.children(".main-menu.selected").removeClass("selected").each(function(){
                var selectedMenu = $(this);
                selectedMenu.find(".main-menu-icon img").each(function(value){
                    var img = $(this);
                    img.attr("src", img.attr("src").replace("-selected", ""));
                });
            });
            //为选中的菜单添加演示
            menu.addClass("selected").find(".main-menu-icon img").each(function(value){
                var img = $(this);
                var imgName = regular.getfileName(img.attr("src"));
                if(imgName){
                    img.attr("src", img.attr("src").replace(imgName, imgName + "-selected"));
                }
            });
            //内容跳转
            var menuName =  menu.attr("menu-nav");
            route.redirect("mainContent", "main", menuName);
        });
        $('[menu-nav="onlineVideo"]').trigger("click");
        //个人中心菜单
        $("#settings").click(function(event){
            global.currentUser(function(state, result){
                route.redirectS("main", "settings", "当前用户" + state && result ? ", " +  result.name : "");
            });
        });
    }
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
            initMenu();
        }
    }
});