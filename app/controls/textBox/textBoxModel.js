var TextBoxModel = ControlModel.extend({
    defaults: _.defaults({
        value: null,
        multiline: false,
        lineCount: 0,
        foreground: 'Black',
        background: 'Transparent',
        textStyle: 'Body1',
        horizontalTextAlignment: 'Left'
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});