//需要安装的插件
//1.cordova plugin add cordova-sqlite-storage, 参考：http://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/
//2.cordova plugin add cordova-plugin-dialogs, 参考：http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html#installation
//3.全屏插件 https://www.npmjs.com/package/cordova-fs-plugin-fullscreen
//4.文件传输插件 cordova plugin add cordova-plugin-file-transfer
//5.监督提示插件 cordova plugin add cordova-plugin-progress-indicator
//6.播放本地视频插件https://github.com/nchutchind/cordova-plugin-streaming-media


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
        "mockjax": "lib/jquery.mockjax.min"
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

