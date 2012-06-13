
function Fluid(default_) {
    this.value = default_;
}

Fluid.prototype.set = function(val) {
    this.value = val;
}

Fluid.prototype.ref = function() {
    return this.value;
}

define(function() {
    return function(default_) {
        return new Fluid(default_);
    };
});