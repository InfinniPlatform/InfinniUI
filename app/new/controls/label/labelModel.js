var LabelModel = ControlModel.extend({
    defaults: _.defaults({
        horizontalTextAlignment: 'Left',
        verticalAlignment: 'Top',
        foreground: 'Black',
        background: 'Transparent',
        textStyle: 'Body1',
        textWrapping: true
    }, ControlModel.prototype.defaults)
});