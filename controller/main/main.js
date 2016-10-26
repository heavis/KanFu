/**
 * 主界面.
 */

define(['jquery', 'swipe', 'route', 'regular', '../common/global', 'mobiscroll', 'sqlite',  '../mock/ajax'], function($, swipe, route, regular, global, mobiscroll, sqlite){
    var host_ = undefined;

    function initEnviroment(){
        //后台服务
        cordova.plugins.backgroundMode.enable();

        //注册闹钟通知事件
        cordova.plugins.notification.local.on("click", function (notification) {
            var videoTable = sqlite.video();
            videoTable.getOne("id = " + notification.id, function(state, result){
                if(state && result.length > 0){
                    var video = result[0];
                    window.plugins.streamingMedia.playVideo(video.src);
                }
            });
        });
    }

    //初始化菜单
    function initMenu(){
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
        //返回按钮监听
        document.addEventListener("backbutton", function(e){
            if ( route.isShowMainPage()) {
                exitAppPopup();
            }else{
                route.closeSubPage();
            };
        });

        function exitAppPopup(){
            route.dialog.confirm("确认退出康复小助手?", function(result){
                if(result){
                    navigator.app.exitApp();
                }
            });
        }
    }

    function initUI(){
        //mobiscroll设置
        mobiscroll.settings = {
            theme: 'android-holo-light',  // Specify theme like: theme: 'ios' or omit setting to use default
            lang: 'zh'                    // Specify language like: lang: 'pl' or omit setting to use default
        };
        //设置body宽度
        var minHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        $(".main-section").css("minHeight", minHeight);
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
            initEnviroment();
            initUI();
            initMenu();
        }
    }
});