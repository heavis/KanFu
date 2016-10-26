/**
 * 在线视频
 */

define(['jquery', 'swipe', 'route', '../common/config','sqlite',  '../mock/ajax', 'mobiscroll'], function($, swipe, route, config, sqlite){
    function loadData(){
        //动态数据展示
        $.post(config.SERVER_HOST +  config.USER_GET_CAGETORY).done(function(result){
            function getCategory(id){
               var cgy = undefined;

                vue.categories.forEach(function(c){
                    if(id == c.id){
                        cgy = c;
                        return false;
                    }
                });

                return cgy;
            }

            var vue = new Vue({
                el: "#mainContent",
                data: {
                    categories: result
                },
                methods:{
                    playVideo: function(cateogryId, videoId){
                        var selectedVideo;
                        vue.categories.forEach(function(ctg){
                            if(ctg.id === cateogryId){
                                ctg.videos.forEach(function(vdo){
                                    if(vdo.id === videoId){
                                        selectedVideo = vdo;

                                        return false;
                                    }
                                });

                                return false;
                            }
                        });
                        if(selectedVideo){
                            route.redirectS("video", "onlineVideo", {videoId: videoId, title: selectedVideo.name});
                        }
                    },
                    downloadVideo: function(cateogryId, videoId){
                        route.dialog.confirm("下载视频", "请确认是否下载视频？", function(result){
                            if(result){
                                var selectedVideo;
                                vue.categories.forEach(function(ctg){
                                    if(ctg.id === cateogryId){
                                        ctg.videos.forEach(function(vdo){
                                            if(vdo.id === videoId){
                                                selectedVideo = vdo;

                                                return false;
                                            }
                                        });

                                        return false;
                                    }
                                });
                                if(selectedVideo){
                                    selectedVideo.downloadState = 1;
                                    var ft = new FileTransfer();
                                    ft.onprogress = function(progressEvent) {
                                        if (progressEvent.lengthComputable) {
                                            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                            $('#dldProgress' + videoId).mobiscroll('setVal', perc);
                                            //SpinnerDialog.show("", "已下载" + perc + "%");
                                        } else {
                                            //SpinnerDialog.show("", "正在下载...");
                                        }
                                    };
                                    var videoPath = cordova.file.dataDirectory + "/" + cateogryId + "/" + videoId + ".mp4",
                                        videoPicPath = cordova.file.dataDirectory + "/" + cateogryId + "/" + videoId + ".jpg";
                                    $.ajax(config.SERVER_HOST + config.USER_GET_VIDEO + "&id=" + videoId).done(function(result){
                                        if(result){
                                            //下载图片
                                            var pic = result.picture;
                                            new FileTransfer().download(pic, videoPicPath);
                                            ft.download(result.src, videoPath, function(entry){
                                                //下载完成
                                                selectedVideo.downloadState = 2;
                                                //SpinnerDialog.hide();
                                                //下载完成后，需要把视频信息保存到本地数据库中
                                                result.src = videoPath;
                                                result.picture = videoPicPath;

                                                var cgy = undefined;
                                                if((cgy = getCategory(cateogryId))){
                                                    result.categoryName = cgy.name;
                                                }
                                                var videoTable = sqlite.video();
                                                videoTable.getOne("serverId = " + videoId, function(state, arr){
                                                    if(state && arr.length === 0){
                                                        videoTable.insert(result);
                                                    }
                                                })
                                            }, function(error){
                                                SpinnerDialog.hide();
                                            }, true);
                                        }
                                    });
                                }
                            }
                        });
                    },
                    videoDownloadDState: function(flag){
                        if(!flag){
                            return "";
                        }else if(flag > 1){
                            return "disable";
                        }else{
                            return "";
                        }
                    },
                    isDownloading: function(flag){
                        return flag === 1;
                    }
                }
            });
            //设置视频的下载状态
            var videoTable = sqlite.video();
            videoTable.get(function(state, result){
                if(state){
                    var downloadedIds = [];
                    result.forEach(function(v){
                        downloadedIds.push(v.serverId);
                    });
                    vue.categories.forEach(function(c){
                        c.videos.forEach(function(v){
                            if(downloadedIds.indexOf(v.id) !== -1){
                                v.downloadState = 2;
                            }
                        })
                    });
                }
            });

            vue.$nextTick(function(){
                $(host_).data(view_, $(host_).children());
            });
            //转换所有进度条
            var moiInst =$("progress").mobiscroll();
            moiInst.progress && moiInst.progress();
        })
    }

    var host_, view_;

    return {
        init:function(host){
            host_ = host;
        },
        loadBefore: function(){

        },
        execute: function(view){
            view_ = view;
            this.loadBefore();
            var cache = $(host_).data(view);
            if(cache){
                $(host_).children().detach();
                $(host_).append(cache);
            }else{
                $(host_).load(view, null, this.loadAfter);
            }
        },
        loadAfter: function(){
            var bullets = document.getElementById('position').getElementsByTagName('li');
            var slider =
                swipe(document.getElementById('slider'), {
                    auto: 3000,
                    continuous: true,
                    callback: function(pos) {
                        var i = bullets.length;
                        while (i--) {
                            bullets[i].className = ' ';
                        }
                        bullets[pos].className = 'on';

                    }
                });

            loadData();
        }
    }
});
