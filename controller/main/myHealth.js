/**
 * 我的康复
 */

define(['jquery', 'swipe', 'route', 'sqlite'], function($, swipe, route, sqlite){
    function loadData(){
        var videoTable = sqlite.video();
        videoTable.get(function(state, result){
            if(!state) return ;
            var arr = [];
            result.forEach(function(item){
                if(item.clock){
                    arr.push(item);
                }
            });

            var vue = new Vue({
                el: "#mainContent",
                data: {
                    videos: arr
                },
                methods:{
                    setTime: function(clockId){
                        alert("设置闹钟：" + clockId);
                    }
                }
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
            loadData();
        }
    }
});
