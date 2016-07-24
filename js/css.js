/**
 *  CSS预加载
 */
(function($){
    //link模板函数
    var cssFunc = function(href){
       return $("<link>")
            .attr({ rel: "stylesheet",
                type: "text/css",
                href: href
            });
    };
    //加载link数组到head
    (function(ele){
       var csses = [
           cssFunc("css/themes/default/jquery.mobile.external-png-1.4.5.min.css"),
           cssFunc("css/themes/default/jquery.mobile.icons-1.4.5.min.css"),
           cssFunc("css/themes/default/jquery.mobile.inline-png-1.4.5.min.css"),
           cssFunc("css/themes/default/jquery.mobile.inline-svg-1.4.5.min.css"),
           cssFunc("css/themes/default/jquery.mobile.structure-1.4.5.min.css"),
           cssFunc("css/themes/default/jquery.mobile.theme-custom.min.css"),
           cssFunc("css/Base/layout.css"),
           cssFunc("css/Base/normalize.css"),
           cssFunc("css/Base/typography.css"),
           cssFunc("css/Modules/login.css"),
           cssFunc("css/Components/input.css")
       ];
       csses.forEach(function(value){
            $(ele).append(value);
    });
    })(document.getElementsByTagName('head')[0]);
})(jQuery);