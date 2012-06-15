
define(["class", "dynamics", "objects/rect"], function(Class, d, Rect) {
    var Removable = Class.extend({
        name: "Removable",

        init: function(types) {
            if(!types.length) {
                types = [types];
            }

            this.types = types;
        },

        remove: function(obj) {
            d.scene.removeObject(obj || this.object);
        },

        onCollide: function(obj) {
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
                if(this.object.name == "bomb") {
                    this.remove(obj);
                }
                else {
                    this.remove();
                    obj.eaten();
                }
            }
        }
    });

    return Removable;
});