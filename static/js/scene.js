
define(["objects/sprite", "behaviors/noop"], function(Sprite, Noop) {

    function Scene() {
        this.object_table = {};
        this.objects = [];
        this.behaviors = [];
        this.global_behavs = [];
        this.batched_behavs = {};
        this.remove_queue = [];
    }

    Scene.prototype.heartbeat = function() {
        this.process_removes();

        var objects = this.objects;
        var behaviors = this.behaviors;
        var global_behavs = this.global_behavs;
        var r = renderer.ref();

        for(var i=0, l=objects.length; i<l; i++) {
            for(var j=0, l2=global_behavs.length; j<l2; j++) {
                global_behavs[j].update(objects[i]);
            }

            r.queue(objects[i]);
        }

        for(var i=0, l=behaviors.length; i<l; i++) {
            if(behaviors[i].update) {
                behaviors[i].update();
            }
        }
    };

    Scene.prototype.get_object = function(name) {
        if(!this.object_table[name]) {
            console.log('get_object: "' + name + '" does not exist!');
        }
        return this.object_table[name];
    };

    Scene.prototype.add_object = function(name, obj /*, behaviors ... */) {
        var behaviors;

        if((typeof name) == "string") {
            behaviors = [].slice.call(arguments, 2);
        }
        else {
            behaviors = [].slice.call(arguments, 1);
            obj = name;
        }

        this.add_behaviors(obj, behaviors);
        this.objects.push(obj);
        this.object_table[name] = obj;

        obj.name = name;
        obj.load();
        
        if(obj.Collidable) {
            var col = obj.Collidable;
            physics.ref().add_object(obj,
                                     col.density,
                                     col.friction,
                                     col.restitution);
        }
    };

    Scene.prototype.remove_object = function(obj) {
        this.remove_queue.push(obj);
    };

    Scene.prototype._remove_object = function(obj) {
        if(typeof obj == "string") {
            obj = this.get_object(obj);
        }

        for(var i=0, l=this.objects.length; i<l; i++) {
            if(this.objects[i] == obj) {
                break;
            }
        }

        this.objects.splice(i, 1);
        delete this.object_table[obj.name];

        var behavs = [];
        var batched_behavs = {};
        for(var i=0, l=this.behaviors.length; i<l; i++) {
            var behav = this.behaviors[i];
            var name = behav.constructor.name;
            
            if(behav.batched) {
                behav.remove_object(obj);

                if(behav.count() > 0 && !batched_behavs[name]) {
                    batched_behavs[name] = behav;
                    behavs.push(behav);
                }
            }
            else if(behav.object != obj) {
                behavs.push(behav);
            }
            else {
                behav.object = null;
            }
        }
        this.behaviors = behavs;
        this.batched_behavs = batched_behavs;

        if(obj.Collidable) {
            physics.ref().remove_object(obj);
        }
    };

    Scene.prototype.process_removes = function() {
        for(var i=0, l=this.remove_queue.length; i<l; i++) {
            this._remove_object(this.remove_queue[i]);
        }
        this.remove_queue = [];
    };

    Scene.prototype.add_behavior = function(obj, behavior) {
        if(!behavior.isinstance(Noop)) {
            this.add_behaviors(obj, [behavior]);
        }
    };

    Scene.prototype.add_behaviors = function(obj, behaviors) {
        if(typeof obj == "string") {
            obj = this.get_object(obj);
        }

        for(var i=0, l=behaviors.length; i<l; i++) {
            if(behaviors[i].isinstance(Noop)) {
                continue;
            }

            var behav = behaviors[i];
            var name = behav.constructor.name;

            obj[name] = behav;
            
            if(!obj.b) {
                obj.b = {};
            }
            obj.b[name] = behav;
            
            if(behav.batched) {
                behav.add_object(obj);

                if(!this.batched_behavs[name]) {
                    this.batched_behavs[name] = true;
                    this.behaviors.push(behav);
                }
            }
            else {
                behav.object = obj;
                this.behaviors.push(behav);
            }
        }
    };

    Scene.prototype.add_global_behavior = function(behavior) {
        this.global_behavs.push(behavior);
    };

    Scene.prototype.walk = function(func) {
        var len = this.objects.length;
        for(var i=0; i<len; i++) {
            this.objects[i] = func(this.objects[i]);
        }
    };

    Scene.prototype.find_obj_at = function(x, y) {
        var len = this.objects.length;

        for(var i=0; i<len; i++) {
            var s = this.objects[i];
            if(s.isinstance(Sprite)) {
                if(s.pos.x < x &&
                   s.pos.x+s.size.x > x &&
                   s.pos.y < y &&
                   s.pos.y+s.size.y > y) {
                    return s;
                }
            }
        }

        return null;
    };

    return Scene;
});