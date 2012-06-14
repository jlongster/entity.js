
define(["util"], function(util) {
    var registry = {};

    function Dynamic(name, default_) {
        if(name == "Dynamic") {
            throw Error('"Dynamic" is an invalid name for a dynamic');
        }

        registry[name] = this;
        this.value = default_;
    }

    function set(val) {
        this.value = val;
    }

    function ref() {
        return this.value;
    };

    registry.Dynamic = util.construct(Dynamic, set, ref);

    return registry;
});