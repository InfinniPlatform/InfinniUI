var ToggleButtonModel = ControlModel.extend({
    defaults: _.defaults({
        value: true,
        textOn: 'ON',
        textOff: 'OFF',
        horizontalAlignment: 'Left'
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});