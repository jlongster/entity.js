
define(["objects/sprite", "behaviors/noop", "class", "dynamics"], function(Sprite, Noop, Class, d) {

    var Scene = Class.extend({
        init: function() {
            this.objectTable = {};
            this.objects = [];
            this.behaviors = [];
            this.globalBehavs = [];
            this.batchedBehavs = {};
            this.removeQueue = [];
        },

        heartbeat: function() {
            this.processRemoves();

            var objects = this.objects;
            var behaviors = this.behaviors;
            var globalBehavs = this.globalBehavs;
            var r = d.renderer;

            for(var i=0, l=objects.length; i<l; i++) {
                for(var j=0, l2=globalBehavs.length; j<l2; j++) {
                    globalBehavs[j].update(objects[i]);
                }

                r.queue(objects[i]);
            }

            for(var i=0, l=behaviors.length; i<l; i++) {
                if(behaviors[i].update) {
                    behaviors[i].update();
                }
            }
        },

        getObject: function(name) {
            if(!this.objectTable[name]) {
                //console.log('getObject: "' + name + '" does not exist!');
            }

            var objs = this.objectTable[name];
            if(objs && objs.length == 1) {
                return objs[0];
            }
            return objs;
        },

        addObject: function(name, obj /*, behaviors ... */) {
            var behaviors;

            if((typeof name) == "string") {
                behaviors = Array.prototype.slice.call(arguments, 2);
            }
            else {
                behaviors = Array.prototype.slice.call(arguments, 1);
                obj = name;
                name = "obj" + Math.floor(Math.random()*10000);
            }

            this.addBehaviors(obj, behaviors);
            this.objects.push(obj);

            if(this.objectTable[name]) {
                this.objectTable[name].push(obj);
            }
            else {
                this.objectTable[name] = [obj];
            }

            obj.name = name;
            obj.load();

            for(var k in obj.b) {
                if(obj.b[k].onAdd) {
                    obj.b[k].onAdd();
                }
            }
        },

        removeObject: function(obj) {
            this.removeQueue.push(obj);
        },

        _removeObject: function(obj) {
            if(typeof obj == "string") {
                obj = this.getObject(obj);
            }

            for(var k in obj.b) {
                if(obj.b[k].onRemove) {
                    obj.b[k].onRemove();
                }
            }

            for(var i=0, l=this.objects.length; i<l; i++) {
                if(this.objects[i] == obj) {
                    break;
                }
            }

            this.objects.splice(i, 1);
            delete this.objectTable[obj.name];

            var behavs = [];
            var batchedBehavs = {};
            for(var i=0, l=this.behaviors.length; i<l; i++) {
                var behav = this.behaviors[i];
                var name = behav.constructor.name;
                
                if(behav.batched) {
                    behav.removeObject(obj);

                    if(behav.count() > 0 && !batchedBehavs[name]) {
                        batchedBehavs[name] = behav;
                        behavs.push(behav);
                    }
                }
                else if(behav.object != obj) {
                    behavs.push(behav);
                }
                else {
                    //console.log("nulled", behav.object.name);
                    //behav.object = null;
                }
            }
            this.behaviors = behavs;
            this.batchedBehavs = batchedBehavs;
        },

        processRemoves: function() {
            for(var i=0, l=this.removeQueue.length; i<l; i++) {
                this._removeObject(this.removeQueue[i]);
            }
            this.removeQueue = [];
        },

        addBehavior: function(obj, behavior) {
            if(!(behavior instanceof Noop)) {
                this.addBehaviors(obj, [behavior]);
            }
        },

        addBehaviors: function(obj, behaviors) {
            if(typeof obj == "string") {
                obj = this.getObject(obj);
            }

            for(var i=0, l=behaviors.length; i<l; i++) {
                if(behaviors[i] instanceof Noop) {
                    continue;
                }

                var behav = behaviors[i];
                var name = behav.name;

                obj[name] = behav;
                
                if(!obj.b) {
                    obj.b = {};
                }
                obj.b[name] = behav;
                
                if(behav.batched) {
                    behav.addObject(obj);

                    if(!this.batchedBehavs[name]) {
                        this.batchedBehavs[name] = true;
                        this.behaviors.push(behav);
                    }
                }
                else {
                    behav.object = obj;
                    this.behaviors.push(behav);
                }
            }
        },

        addGlobalBehavior: function(behavior) {
            this.globalBehavs.push(behavior);
        }
    });

    return Scene;
});