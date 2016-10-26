//需要安装的插件
//1.cordova plugin add cordova-sqlite-storage, 参考：http://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/
//2.cordova plugin add cordova-plugin-dialogs, 参考：http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html#installation
//3.全屏插件 https://www.npmjs.com/package/cordova-fs-plugin-fullscreen
//4.文件传输插件 cordova plugin add cordova-plugin-file-transfer
//5.监督提示插件 cordova plugin add cordova-plugin-progress-indicator
//6.播放本地视频插件https://github.com/nchutchind/cordova-plugin-streaming-media
//7.闹钟设置插件 cordova-plugin-local-notifications   https://github.com/katzer/cordova-plugin-local-notifications
//8. 后台服务 com.red_folder.phonegap.plugin.backgroundservice http://phonegap-plugins.com/plugins/phpsa/cbsp
/*//8.声音播放插件 cordova-plugin-media */

/**
 * 页面切换：
 *      在线视频、本地视频、我的康复，页面切换时原来页面需要缓存。页面下拉支持刷新
 * 在线视频：
 *      按照康复类别显示视频列表，视频可在线播放，也支持下载。已经下载过的视频需要表示出是否已下载。能明显区分视频下载状态。
 * 本地视频：
 *      支持播放和设置闹钟
 * 我的康复：
 *      显示设置过闹钟的视频，支持播放和设置闹钟
 *  更多：
 */

/**
 * 闹钟设置：
 * 本地视频都可以设置闹钟，闹钟按每天设置，闹钟可取消。
 */

requirejs.config({
    paths:{
        "jquery" : "lib/jquery",
        "less": "lib/less.min",
        "jqueymobile": "lib/jquery.mobile",
        "jqueryextend": "lib/jquery.heavisoft",
        "sqlite": "lib/heavisoft.sqlite",
        "route": "lib/heavisoft.route",
        "swipe": "lib/swipe",
        "regular": "lib/heavisoft.regular",
        "hivideo": "lib/hivideo",
        "validate": "lib/jquery.validate.min",
        "message_zh": "lib/messages_zh.min",
        "mockjax": "lib/jquery.mockjax.min",
        "mobiscroll": "lib/mobiscroll.min"
    }
});

requirejs(['jquery', 'less', 'jqueymobile', 'jqueryextend', 'route', 'sqlite'],
    function($, less, jqueymobile, jqueryextend, route, sqlite){
    var app = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        receivedEvent: function(id) {
            setTimeout(function(){
                //1.从本地数据库获取用户session信息
                var current = sqlite.current();
                current.get(function(state, result){
                    //2.验证session信息是否有效
                    if(state && result.length > 0){
                        result = result[0];
                        var userDb = sqlite.user();
                        userDb.get(result.name, function(state, result){
                            //3.如果session失效，进入登录界面；如果session有效，进入主界面
                            if(state && result.length > 0){
                                result = result[0];
                                //判断session日期是否大于一周，大于一周需要重新登录，小于一周直接进入主界面
                                if(!result.lastModifyTime){
                                    route.redirect("login", "login");
                                }else{
                                    var date = new Date(result.lastModifyTime);
                                    date.setDate(date.getDate() + 7);
                                    if(date < new Date){
                                        route.redirect("login", "login");
                                    }else{
                                        route.redirect("main", "main");
                                    }
                                }
                            }
                        });
                    }else{
                        route.redirect("login", "login");
                    }
                });
            }, 500);
        }
    };
    app.initialize();
});

