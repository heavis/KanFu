/**
 * Sqlite数据库管理.
 */

define(function(){
    var heavisoft = {};

    heavisoft.const = {
        dbName: "heavisoft_localDb",
        userTableName: "t_user",
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
            var sql = 'CREATE TABLE IF NOT EXISTS ' + cur.name + ' (id integer primary key, name text, session text, lastModifyTime text)';
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
            var sql = 'select name, session, lastModifyTime from ' + cur.name + " where name like '%" + name + "%'";
            cur.localDb.executeSql(sql, [], function(state, result){
                var arr = [];
                if(state){
                    var len = result.rows.length, i;
                    for(i = 0; i < len; i++){
                        arr.push({
                            name: result.rows.item(i).name,
                            session: result.rows.item(i).session,
                            lastModifyTime: result.rows.item(i).lastModifyTime
                        })
                    }
                }
                if(callback){
                    callback(state, state ? arr : result);
                }
            });
        }
    };
    heavisoft.user.prototype.init.prototype = heavisoft.user.prototype;

    return heavisoft;
});

