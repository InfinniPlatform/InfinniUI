var ButtonModel = ControlModel.extend({
    defaults: _.defaults({
        action: null,
        horizontalAlignment: 'Left',
        image: null,
        parentEnabled: true
    }, ControlModel.prototype.defaults)
});
