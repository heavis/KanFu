/**
 * 扩展jquery功能.
 */
define(['jquery'], function(jquery){
    (function($){
        if($){
            $.extend({
                getFormJson:function(form){
                    var o = {};
                    var a = $(form).serializeArray();
                    $.each(a, function () {
                        if (o[this.name] !== undefined) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || '');
                        } else {
                            o[this.name] = this.value || '';
                        }
                    });
                    return o;
                }
            });
        }
    })(jquery);
});
