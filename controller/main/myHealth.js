/**
 * 我的康复
 */

define(['jquery', 'swipe', 'route'], function($, swipe, route){
    function loadData(){
        var vue = new Vue({
            el: "#mainContent",
            data: {
                clocks: [
                    {
                        id: 1,
                        name: "关节脱位康复",
                        img: "assets/img/main/video.png",
                        time: "08:45"
                    },
                    {
                        id: 2,
                        name: "小腿肌肉康复",
                        img: "assets/img/main/video.png",
                        time: "12:45"
                    },
                    {
                        id: 3,
                        name: "手部肌肉恢复",
                        img: "assets/img/main/video.png",
                        time: "15:00"
                    },
                    {
                        id: 4,
                        name: "大腿肌肉康复",
                        img: "assets/img/main/video.png",
                        time: "18:30"
                    },
                    {
                        id: 5,
                        name: "软组织损伤",
                        img: "assets/img/main/video.png",
                        time: "20:30"
                    }
                ]
            },
            methods:{
              setTime: function(clockId){
                  alert("设置闹钟：" + clockId);
              }
            }
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
