var ImageBoxModel = ControlModel.extend({
    defaults: _.defaults({
        value: null,
        readOnly: false,
        maxSize: 0
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});
