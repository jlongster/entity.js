
define(["util"], function(util) {
    function Removable(types) {
        if(!types.length) {
            types = [types];
        }

        this.types = types;
    }

    function remove() {
        scene.ref().remove_object(this.object);
    }

    function onCollide(obj) {
        if(this.types) {
            var t = false;
            for(var i=0, l=this.types.length; i<l; i++) {
                if(obj.isinstance(this.types[i])) {
                    this.remove();
                }
            }
        }
        else {
            this.remove();
        }
    }

    return util.construct(Removable, remove, onCollide);
});