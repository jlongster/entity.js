
define(["util", "dynamics"], function(util, d) {
    function Removable(types) {
        if(!types.length) {
            types = [types];
        }

        this.types = types;
    }

    function remove() {
        d.scene.ref().remove_object(this.object);
    }

    function onCollide(obj) {
        // if(this.types) {
        //     var t = false;
        //     for(var i=0, l=this.types.length; i<l; i++) {
        //         if(obj.isinstance(this.types[i])) {
        //             this.remove();
        //         }
        //     }
        // }
        // else {
        //     this.remove();
        // }

        if(obj.name == "player") {
            this.remove();
        }
    }

    return util.construct(Removable, remove, onCollide);
});