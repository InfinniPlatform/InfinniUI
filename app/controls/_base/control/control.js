/**
 * @description Базовый класс контролов
 * @class Control
 */
var Control = function () {
    this.controlModel = this.createControlModel();
    this.controlView = this.createControlView(this.controlModel);

    this.initHandlers();

};

_.extend(Control.prototype, {

    createControlModel: function () {
        throw ('Не перегружен абстрактный метод Control.createControlModel()');
    },

    createControlView: function (model) {
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

    onKeyDown: function (handler) {
        this.controlView.on('onKeyDown', handler);
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