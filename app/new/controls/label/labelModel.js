var LabelModel = ControlModel.extend(_.extend({

    defaults: _.defaults({
        horizontalTextAlignment: 'Left',
        verticalAlignment: 'Top',
        textWrapping: true,
        textTrimming: true,
        escapeHtml: true
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }
}, editorBaseModelMixin));