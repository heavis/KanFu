/**
 * ajax请求模拟
 */
define(['jquery', '../common/config', 'mockjax'], function($, config){
    function getResult(state, data){
        return {result: state, data: data};
    }

    //验证用户账号是否存在
    $.mockjax({
        url: config.SERVER_HOST + config.URL_USER_VALIDATE,
        response: function(settings) {
            var name = settings.data.username,
                names = ["wl", "xh", "heavi", "wanglei"];

            if ($.inArray(name, names) !== -1) {
                this.responseText = "false";
            }else{
                this.responseText = "true";
            }
        },
        responseTime: 500
    });
    //注册账号
    $.mockjax({
        url: config.SERVER_HOST + config.URL_USER_REGIST,
        contentType: "application/json",
        response: function(settings) {
            var name = settings.data.username,
                names = ["wl", "xh", "heavi", "wanglei"];

            if ($.inArray(name, names) !== -1) {
                this.responseText = getResult(false, "用户已存在!");
            }else{
                this.responseText = getResult(true, "恭喜你,账号注册成功.");
            }
        },
        responseTime: 500
    });
    //登录账号
    $.mockjax({
        url: config.SERVER_HOST + config.URL_LOGIN,
        contentType: "application/json",
        response: function(settings) {
            var data = JSON.parse(settings.data),
                name = data.username,
                pwd = data.password,
                accounts = [{username: "wl", pwd: "123456"}, {username: "xh", pwd: "123456"}, {username: "heavi", pwd: "123456"}];

            var success = false;
            accounts.forEach(function(account){
                if(account.username == name && account.pwd == pwd){
                    success = true;

                    return false;
                }
            });
            if(success){
                this.responseText = getResult(true, {session: "session" + (+new Date), lastModifyTime: (new Date).toString()});
            }else{
                this.responseText = getResult(false, "登录失败, 用户或密码无效!");
            }
        },
        responseTime: 500
    });

    /*
    //获取视频详细信息
    $.mockjax({
        url: config.SERVER_HOST + config.USER_GET_VIDEO + "?id=*",
        contentType: "application/json",
        response: function(settings){
            this.responseText = {
                videoId: 1,
                name: "测试锻炼",
                picture: "https://media.w3.org/2010/05/sintel/poster.png",
                video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
                desc: "肌肉有节奏的收缩和放松。上肢可握拳，悬臂，提肩， 使整个上肢肌肉收缩，再放松。下肢可使踝关节背屈， 股四头肌收缩，使整"
            }
        }
    });

    //获取分类信息
    $.mockjax({
        url: config.SERVER_HOST +  config.USER_GET_CAGETORY,
        contentType: "application/json",
        response: function(settings){
            this.responseText = {
                categories: [
                    {
                        id: 1,
                        name: "热门视频",
                        img: "assets/img/main/cgy-hot.png",
                        videos: [
                            {
                                id: 1,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤1",
                            },
                            {
                                id: 2,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤2",
                            },
                            {
                                id: 3,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤3",
                            },
                            {
                                id: 4,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤4",
                            },
                            {
                                id: 5,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤5",
                            },
                            {
                                id: 6,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤6",
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "骨关节损伤",
                        img: "assets/img/main/number1.png",
                        videos: [
                            {
                                id: 1,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤1",
                            },
                            {
                                id: 2,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤2",
                            },
                            {
                                id: 3,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤3",
                            },
                            {
                                id: 4,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤4",
                            },
                            {
                                id: 5,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤5",
                            },
                            {
                                id: 6,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤6",
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "退行性骨关节疾病",
                        img: "assets/img/main/number2.png",
                        videos: [
                            {
                                id: 1,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤1",
                            },
                            {
                                id: 2,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤2",
                            },
                            {
                                id: 3,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤3",
                            },
                            {
                                id: 4,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤4",
                            },
                            {
                                id: 5,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤5",
                            },
                            {
                                id: 6,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤6",
                            }
                        ]
                    },
                    {
                        id: 4,
                        name: "神经系统疾病",
                        img: "assets/img/main/number3.png",
                        videos: [
                            {
                                id: 1,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤1",
                            },
                            {
                                id: 2,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤2",
                            },
                            {
                                id: 3,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤3",
                            },
                            {
                                id: 4,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤4",
                            },
                            {
                                id: 5,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤5",
                            },
                            {
                                id: 6,
                                picture: "assets/img/main/video.png",
                                name: "软组织损伤6",
                            }
                        ]
                    }
                ]
            }
        }
    }); */
})
