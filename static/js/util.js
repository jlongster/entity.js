
define(function() {

    function _construct() {
        var ctor = arguments[0];
        var parent = arguments[1];
        var methods = Array.prototype.slice.call(arguments, 2);

        function Class() {
            // see "examples" in here:
            // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
            //
            // this is equivalent to `new ctor()`, but lets
            // us apply arguments
            var o = Object.create(ctor.prototype);

            // Init the object and use the returned value, if
            // there is one
            return ctor.apply(o, arguments) || o;
        };

        Class.extend = function() {
            // Use this class as the parent
            var args = [arguments[0]];
            args.push(ctor);
            args = args.concat(Array.prototype.slice.call(arguments, 1));

            return _construct.apply(null, args);
        };

        Class.init = function(obj) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ctor.apply(obj, args);
        };

        var typename = ctor.prototype.constructor.name;

        ctor.prototype = Object.create(parent.prototype);
        ctor.prototype.constructor = ctor;
        ctor.prototype.isinstance = function(type) {
            if(type.typeinst) {
                // If checking against a class, we can check the type
                // of a class-wide instance var
                return (type.typeinst instanceof ctor);
            }
            else {
                // If checking against the constructor function, we
                // need to compare this instance with the constructor
                return (this instanceof type);
            }
        };
        ctor.prototype.typename = typename;

        // Create a type instance that lets us do `instanceof` checks
        Class.typeinst = Object.create(ctor.prototype);

        for(var i in methods) {
            var name = methods[i].prototype.constructor.name;
            ctor.prototype[name] = methods[i];
        }
        
        return Class;
    }

    function construct() {
        // Use Base as the parent class, inject it as the second
        // parameter
        var args = [arguments[0]];
        args.push(Object);
        args = args.concat(Array.prototype.slice.call(arguments, 1));

        return _construct.apply(null, args);
    }

    function function_name(func) {
        return func.name;
    }

    return {
        vec2d: function(x, y) { return {x:x, y:y}; },
        vec3d: function(x, y, z) { return {x:x, y:y, z:z}; },
        color: function(r, g, b) { return {r:r, g:g, b:b}; },
        construct: construct
    };
});