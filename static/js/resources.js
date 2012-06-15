
define(function() {
    var cache = {};

    function load_texture(path, k) {
        if(!cache[path]) {
            var img = new Image();
            img.onload = k;
            img.src = path;
            cache[path] = img;
        }
        else {
            k();
        }
    }

    function get_texture(path) {
        return cache[path];
    }

    return { load_texture: load_texture,
             get_texture: get_texture };
});