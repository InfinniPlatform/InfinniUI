var CheckBoxModel = ControlModel.extend({
    defaults: _.defaults({
        value: false,
        foreground: 'Black',
        textStyle: 'Body1'
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});