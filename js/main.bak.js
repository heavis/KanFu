//需要安装的插件
//1.cordova plugin add cordova-sqlite-storage, 参考：http://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/
//2.cordova plugin add cordova-plugin-dialogs, 参考：http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html#installation
//3.全屏插件 https://www.npmjs.com/package/cordova-fs-plugin-fullscreen

require.config({
    paths:{
        "jquery" : "lib/jquery",
        "less": "lib/less.min",
        "jqueymobile": "lib/jquery.mobile",
        "jqueryextend": "lib/jquery.heavisoft",
        "sqlite": "lib/heavisoft.sqlite",
        "route": "lib/heavisoft.route",
        "swipe": "lib/swipe",
        "regular": "lib/heavisoft.regular",
        "hivideo": "lib/hivideo"
    }
});

require(['jquery', 'less', 'jqueymobile', 'jqueryextend', 'route', 'hivideo'], function($, less, jqueymobile, jqueryextend, route, hivideo){
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
                //route.redirect("login", "login");
                route.redirect("login", "login");
            }, 500);
        }
    };
    app.initialize();
});

