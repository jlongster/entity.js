
define(["class"], function(Class) {
    
    return Class.extend({
        init: function (opts) {
            this.components = opts.components || [];
        }
    });

});