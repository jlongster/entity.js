
define(["engine", "renderer", "physics",
        "scene", "input"], function(Engine, Renderer, Physics, Scene, Input) {

            return Engine.extend({
                init: function() {
                    this.parent();
                    this.addTask("renderer", new Renderer("canvas", 500, 500));
                    this.addTask("scene", new Scene());
                    this.addTask("physics", new Physics());
                    this.addTask("input", new Input());
                }
            });

        });