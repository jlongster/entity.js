
define(["class"], function(Class) {
    
    return Class.extend("Base", {
        init: function (opts) {
            this.setup(opts);
            this.components = Array.prototype.slice.call(arguments, 1);
        },

        setup: function(opts) {
            throw Error("setup: not implemented");
        }
    });

});