/**
 * 全局对象
 */

define(['sqlite'], function(sqlite){
    function currentUser(callback){
        var current = sqlite.current();
        current.get(function(state, result){
            if(state && result.length > 0){
                result = result[0];
                var userDb = sqlite.user();
                userDb.get(result.name, function(state, result){
                    callback && callback(state, !result ? undefined : result.length == 0 ? undefined : result[0]);
                });
            }else{
                callback && callback(state);
            }
        });
    }

    function ajax(option){
        //设置超时时间为4000毫秒
        var timeout = 4000;

        if(("timeout" in option)){
            option["timeout"] = timeout;
        }

        return $.ajax(option);
    }

    return {
        currentUser: currentUser,
        ajax: ajax
    }
});
