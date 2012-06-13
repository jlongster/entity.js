
define(function() {
    function update(object) {
        if(!object.Sticky) {
            object.pos.y += 1;
            object.moved = true;
        }
    }

    return {update: update};
});