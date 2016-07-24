/**
 * 正则表达式
 */
define(function(){
   return {
       /**
        * 获取文件名字
        * @param path 文件路径
        * @returns {string} 文件名
        */
       getfileName:function(path){
           var reg = /\/(\w+-*\w+).\w+$/; //文件名中间可能有‘-’符号
           var take = reg.exec(path);
           return take && take[1];
       }
   }
});