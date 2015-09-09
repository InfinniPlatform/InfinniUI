var ToggleButtonModel = ControlModel.extend( _.extend({

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin));