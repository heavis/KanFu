/**
 * Sqlite数据库管理.
 */

define(function(){
    var heavisoft = {};

    heavisoft.const = {
        dbName: "heavisoft_localDb",
        userTableName: "t_user",
        TABLENAME_CURRENT: "t_current",
        TABLENAME_VIDEO: "t_video"
    }
    /*------------------- 数据库操作，内部使用---------------------------------- */
    heavisoft.db = function(){
        return new heavisoft.db.prototype.init(heavisoft.const.dbName);
    };

    heavisoft.db.prototype = {
        init: function(name){
            this.name = name;
            this.localDb = null;

            return this;
        },
        openDatabase: function(){
            var cur = this;

            if(!cur.localDb){
                cur.localDb = window.sqlitePlugin.openDatabase({name: cur.name, location: 'default', androidDatabaseImplementation: 2}, function(db){
                        console.log("open database success.")
                    },
                    function(error){
                        console.log("open database failed.")
                    })
            }

            return cur;
        },
        executeSql: function(sql, parameters, callback){
            parameters = parameters ||  [];
            var cur = this;
            if(cur.localDb){
                cur.localDb.transaction(function(transaction) {
                    transaction.executeSql(sql, parameters,
                        function(tx, result) {
                            callback(true, result);
                        },
                        function(tx, error) {
                            callback(false, error);
                        });
                });
            }
        },
        name: ""
    }
    heavisoft.db.prototype.init.prototype = heavisoft.db.prototype;

    /*------------------- 用户信息表 ---------------------------------- */
    heavisoft.user = function(){
        return new heavisoft.user.prototype.init(heavisoft.const.userTableName);
    }

    heavisoft.user.prototype = {
        init: function(name){
            this.name = name;
            this.localDb = heavisoft.db().openDatabase();
            this._createTable();

            return this;
        },
        _createTable: function(){
            var cur = this;
            var sql = 'CREATE TABLE IF NOT EXISTS ' + cur.name + ' (id integer primary key, name text, session text, lastModiyfTime text)';
            cur.localDb.executeSql(sql, [], function(state, result){
                console.log("create user table " + (state ? "successfully" : "failed"));
            });
        },
        insert: function(user, callback){
            var cur = this;
            var sql = 'insert into ' + this.name + '(name, session, lastModifyTime) values(?, ?, ?)';
            cur.localDb.executeSql(sql, [user['name'], user['session'], user['lastModifyTime']], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        },
        update: function(user, callback){
            var cur = this;
            var sql = 'UPDATE ' + cur.name + ' SET name=?, session=?, lastModifyTime = ? WHERE name = "' + user['name']  + '"' ;
            cur.localDb.executeSql(sql, [user['name'], user['session'], user['lastModifyTime']], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        },
        get: function(name, callback){
            if(name && typeof name === "funciton"){
                callback = name;
                name = "";
            }

            var cur = this;
            var sql = 'select id, name, session, lastModifyTime from ' + cur.name + " where name like '%" + name + "%'";
            cur.localDb.executeSql(sql, [], function(state, result){
                var arr = [];
                if(state){
                    var len = result.rows.length, i;
                    for(i = 0; i < len; i++){
                        arr.push({
                            id: result.rows.item(i).id,
                            name: result.rows.item(i).name,
                            session: result.rows.item(i).session,
                            lastModifyTime: result.rows.item(i).lastModifyTime
                        })
                    }
                }
                if(callback){
                    callback(state, arr);
                }
            });
        },
        delete: function(name, callback){
            var cur = this;
            var sql = "delete from " + cur.name + " where name = '" + name +  "'";
            cur.localDb.executeSql(sql, [], function(state, result){
                if(callback){
                    callback(state);
                }
            });
        }
    };
    heavisoft.user.prototype.init.prototype = heavisoft.user.prototype;

    /*------------------- 当前登录用户表 ---------------------------------- */
    heavisoft.current = function(){
        return new heavisoft.current.prototype.init(heavisoft.const.TABLENAME_CURRENT);
    }

    heavisoft.current.prototype = {
        constructor: heavisoft.current,
        init: function(name){
            this.name = name;
            this.localDb = heavisoft.db().openDatabase();
            this._createTable();

            return this;
        },
        _createTable: function(){
            var cur = this;
            var sql = 'CREATE TABLE IF NOT EXISTS ' + cur.name + ' (id integer primary key, name text, userId integer)';
            cur.localDb.executeSql(sql, [], function(state, result){
                console.log("create user table " + (state ? "successfully" : "failed"));
            });
        },
        update: function(current, callback){
            var cur = this;
            var sql = 'UPDATE ' + cur.name + ' SET name=?, userId = ?' ;
            cur.localDb.executeSql(sql, [user['name'], user['userId']], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        },
        insert: function(current, callback){
            var cur = this;
            var sql = 'insert into ' + cur.name + '(name, userId) values(?, ?)';
            cur.localDb.executeSql(sql, [current['name'], current['userId']], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        },
        get: function(callback){
            var cur = this;
            var sql = 'select name, userId from ' + cur.name ;
            cur.localDb.executeSql(sql, [], function(state, result){
                var arr = [];
                if(state){
                    var len = result.rows.length, i;
                    for(i = 0; i < len; i++){
                        arr.push({
                            name: result.rows.item(i).name,
                            userId: result.rows.item(i).userId
                        })
                    }
                }
                if(callback){
                    callback(state, arr);
                }
            });
        },
        delete: function(callback){
            var cur = this;
            var sql = "delete from " + cur.name;
            cur.localDb.executeSql(sql, [], function(state, result){
                if(callback){
                    callback(state);
                }
            });
        }
    }

    heavisoft.current.prototype.init.prototype = heavisoft.current.prototype;

    /*------------------- 视频表 ---------------------------------- */
    heavisoft.video = function(){
        return new heavisoft.video.prototype.init(heavisoft.const.TABLENAME_VIDEO);
    }
    heavisoft.video.prototype ={
        constructor: heavisoft.video,
        init: function(name){
            this.name = name;
            this.localDb = heavisoft.db().openDatabase();
            this._createTable();

            return this;
        },
        _createTable: function(){
            var cur = this;
            var sql = "CREATE TABLE IF NOT EXISTS " + cur.name + " (id integer primary key, name text, picture text, src text, desc text, categoryId integer, categoryName text, clock text)";
            cur.localDb.executeSql(sql, [], function(state, result){
                console.log("create t_video table " + (state ? "successfully" : "failed"));
            });
        },
        insert: function(video, callback){
            var cur = this;
            var sql = 'insert into ' + cur.name + '(name, picture, src, desc, categoryId, categoryName) values(?, ?, ?, ?, ?, ?)';
            cur.localDb.executeSql(sql, [ video['name'], video['picture'], video["src"], video["desc"], video["categoryId"], video['categoryName'] || ""], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        },
        get: function(callback){
            var cur = this;
            var sql = 'select id, name, picture, src, desc, categoryId, categoryName, clock from ' + cur.name ;
            cur.localDb.executeSql(sql, [], function(state, result){
                var arr = [];
                if(state){
                    var len = result.rows.length, i;
                    for(i = 0; i < len; i++){
                        arr.push({
                            id: result.rows.item(i).id,
                            name: result.rows.item(i).name,
                            picture: result.rows.item(i).picture,
                            src: result.rows.item(i).src,
                            desc: result.rows.item(i).desc,
                            categoryId: result.rows.item(i).categoryId,
                            categoryName: result.rows.item(i).categoryName,
                            clock: result.rows.item(i).clock
                        })
                    }
                }
                if(callback){
                    callback(state, arr);
                }
            });
        },
        updateClock: function(time, id, callback){
            var cur = this;
            var sql = 'update ' + cur.name + ' set clock = ? where id = ?';
            cur.localDb.executeSql(sql, [time, id], function(state, result){
                if(callback){
                    callback(state, result);
                }
            });
        }
    }
    heavisoft.video.prototype.init.prototype = heavisoft.video.prototype;


    /*------------------- 结束 ---------------------------------- */
    return heavisoft;


});

