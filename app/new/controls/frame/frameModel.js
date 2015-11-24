var FrameModel = ControlModel.extend(_.extend({

    defaults: _.defaults({},
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults
    ),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }
}, editorBaseModelMixin));