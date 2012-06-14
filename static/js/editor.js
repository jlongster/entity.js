
function init() {
    var canvas = $(renderer.ref()._canvas);
    canvas.on('click', function(e) {
        var off = canvas.offset();
        var x = e.pageX - off.left;
        var y = e.pageY - off.top;

        activate(scene.ref().find_obj_at(x, y));
    });

    $('button.save').on('click', function() {
        save();
    });

    $('button.save-fork').on('click', function() {
        save_fork();
    });
}

var entity;
var active;

function activate(target) {
    scene.ref().walk(function(obj) {
        obj.activated = false;
        return obj;
    });

    $('.methods').empty();

    if(target) {
        target.activated = true;
        active = target;

        var typename = target.constructor.name.toLowerCase();
        var container = $('.methods');

        $.getJSON('/sob/' + typename, function(r) {
            entity = r;
            $('.dependencies').html(r.deps.toSource());

            for(var name in r.methods) {
                container.append('<div><h4>' + name + '</h4>' +
                                 '<textarea>' + 
                                 r.methods[name] + '</textarea>' +
                                 '</div>');
            }
        });
    }
}

function save() {
    var typename = active.constructor.name.toLowerCase();

    var methods = {};
    $('.methods').children().each(function(i, v) {
        var el = $(v);
        var name = el.children('h4').html();
        methods[name] = el.children('textarea')[0].value;
    });

    var ds = [];
    for(var d in entity.deps) {
        ds.push('"' + d + '"');
    }

    var vs = [];
    for(var d in entity.deps) {
        vs.push(entity.deps[d]);
    }

    var req = 'require([' + ds.join(',') + ',"sobs/entity"], ' +
        'function(' + vs.join(',') + ',Entity) {\n';

    for(var name in methods) {
        var code = req;
        code += 'active.' + name + ' = function() {\n';
        code += methods[name];
        code += '};';
        code += '})';
        eval(code);
    }

    var sob = { methods: methods };
    $.post('/sob/' + typename, { data: JSON.stringify(sob) });
}

function save_fork() {
    var typename = active.constructor.name.toLowerCase();

    $.post('/fork-sob/' + typename, { data: JSON.stringify(sob) });    
}

define(function() {
    return {init: function() {}};
});