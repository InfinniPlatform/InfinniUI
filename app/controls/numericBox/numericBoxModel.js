var NumericBoxModel = ControlModel.extend({
    defaults: _.defaults({
        value: 0,
        readOnly: false,
        minValue: 0,
        maxValue: Number.MAX_VALUE,
        increment: 1
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});