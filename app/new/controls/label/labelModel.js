var LabelModel = ControlModel.extend(_.extend({

    defaults: _.defaults({
        horizontalTextAlignment: 'Left',
        verticalAlignment: 'Top',
        foreground: 'Black',
        background: 'Transparent',
        textStyle: 'Body1',
        textWrapping: true
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }
}, editorBaseModelMixin));