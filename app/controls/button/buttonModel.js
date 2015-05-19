var ButtonModel = ControlModel.extend({
    defaults: _.defaults({
        action: null,
        horizontalAlignment: 'Left'
    }, ControlModel.prototype.defaults)
});
