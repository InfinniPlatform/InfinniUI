/**
 * @description Базовый класс контролов
 * @class Control
 */
var Control = function (viewMode) {
    this.controlModel = this.createControlModel();
    this.controlView = this.createControlView(this.controlModel, viewMode);

    this.initHandlers();

};

_.extend(Control.prototype, {

    createControlModel: function () {
        throw ('Не перегружен абстрактный метод Control.createControlModel()');
    },

    createControlView: function (model, viewMode) {
        throw ('Не перегружен абстрактный метод Control.createControlView()');
    },

    initHandlers: function () {
        this.controlView.on('onLoaded', function () {
            this.controlModel.set('isLoaded', true);
        }, this);
    },

    set: function (key, value) {
        this.controlModel.set(key, value);
    },

    get: function (key) {
        return this.controlModel.get(key);
    },

    on: function (name, handler) {
        return this.controlModel.on(name, handler);
    },

    render: function () {
        return this.controlView.render().$el;
    },

    getChildElements: function () {
        return [];
    },

    onLoaded: function (handler) {
        this.controlModel.on('change:isLoaded', function (isLoaded) {
            if (isLoaded) {
                handler();
            }
        });
    },

    onMouseDoubleClick: function (handler) {
        this.controlView.$el.on('dblclick', handler);
    },

    onMouseDown: function (handler) {
        this.controlView.$el.on('mousedown', handler);
    },

    onMouseUp: function (handler) {
        this.controlView.$el.on('mouseup', handler);
    },

    onMouseEnter: function (handler) {
        this.controlView.$el.on('mouseenter', handler);
    },

    onMouseLeave: function (handler) {
        this.controlView.$el.on('mouseleave', handler);
    },

    onMouseMove: function (handler) {
        this.controlView.$el.on('mousemove', handler);
    },

    onKeyDown: function (handler) {
        this.controlView.$el.on('keydown', handler);
    },

    onKeyUp: function (handler) {
        this.controlView.$el.on('keyup', handler);
    },

    remove: function(){
        this.controlView.remove();
    }
});

_.mixin({
    'inherit': function (child, parent) {
        var f = new Function();
        f.prototype = parent.prototype;

        child.prototype = new f();
        child.prototype.constructor = child;

        child.superclass = parent.prototype;
    },

    'superClass': function (obj, context, values) {
        var args = _.toArray(arguments);
        args.splice(0, 2);

        obj.superclass.constructor.apply(context, args);
    }
});