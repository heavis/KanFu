//需要安装的插件
//1.cordova plugin add cordova-sqlite-storage, 参考：http://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/
//2.cordova plugin add cordova-plugin-dialogs, 参考：http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/index.html#installation

require.config({
    paths:{
        "jquery" : "lib/jquery",
        "less": "lib/less.min",
        "jqueymobile": "lib/jquery.mobile",
        "jqueryextend": "lib/jquery.heavisoft",
        "sqlite": "lib/heavisoft.sqlite",
        "route": "lib/heavisoft.route",
        "swipe": "lib/swipe",
        "regular": "lib/heavisoft.regular"
    }
});

require(['jquery', 'less', 'jqueymobile', 'jqueryextend', 'route'], function($, less, jqueymobile, jqueryextend, route){
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            setTimeout(function(){
                //route.redirect("login", "login");
                route.redirect("login", "login");
            }, 500);
        }
    };
    app.initialize();
});

