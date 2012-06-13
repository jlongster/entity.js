
define(function() {
    var pressed_keys = {};
    var once_pressed = {};

    var special_keys = {
        32: 'SPACE',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN'
    };

    function set_key(event, status) {
        var code = event.keyCode;
        var key;

        if(code in special_keys) {
            key = special_keys[code];
        }
        else {
            key = String.fromCharCode(code);
        }

        if(!pressed_keys[key]) {
            once_pressed[key] = status;
        }

        pressed_keys[key] = status;
    }

    $(document).on('keydown', function(e) {
        set_key(e, true);
    });

    $(document).on('keyup', function(e) {
        set_key(e, false);
    });

    return {
        down: function(key) {
            return pressed_keys[key.toUpperCase()];
        },

        once: function(key) {
            return once_pressed[key.toUpperCase()];
        },

        reset: function() {
            once_pressed = {};
        }
    };
});