var TextBoxModel = ControlModel.extend({
    defaults: _.defaults({
        value: null,
        multiline: false,
        lineCount: 0
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});