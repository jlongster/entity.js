
define(function() {
    function extend(cls, props) {
        var prototype = Object.create(cls.prototype);
        var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;

        for(var k in props) {
            var src = props[k];
            var parent = prototype[k];

            if(typeof parent == "function" &&
               typeof src == "function" &&
               fnTest.test(src)) {
                prototype[k] = (function (src, parent) {
                    return function() {
                        // Save the current parent method
                        var tmp = this.parent;

                        // Set parent to the previous method, call, and restore
                        this.parent = parent;
                        var res = src.apply(this, arguments);
                        this.parent = tmp;

                        return res;
                    };
                })(src, parent);
            }
            else {
                prototype[k] = src;
            }
        }

        var new_cls = function() { 
            if(prototype.init) {
                prototype.init.apply(this, arguments);
            }
        };

        new_cls.prototype = prototype;
        new_cls.prototype.constructor = new_cls;

        new_cls.extend = function(props) {
            return extend(new_cls, props);
        };

        return new_cls;
    }

    return extend(Object, {});
});