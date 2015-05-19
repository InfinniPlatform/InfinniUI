var LabelModel = ControlModel.extend({
    defaults: _.defaults({
        horizontalTextAlignment: 'Left',
        verticalAlignment: 'Stretch'
    }, ControlModel.prototype.defaults)
});