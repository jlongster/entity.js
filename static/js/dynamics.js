
define(["class"], function(Class) {
    var registry = {};

    registry.createDynamic = function(name, default_) {
        if(name == "createDynamic") {
            throw Error('"createDynamic" is an invalid name for a dynamic');
        }

        registry[name] = default_;
    };

    return registry;
});