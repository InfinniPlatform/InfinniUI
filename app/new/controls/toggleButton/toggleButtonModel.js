var ToggleButtonModel = ControlModel.extend( _.extend({

    defaults: _.defaults({
        value: true,
        textOn: 'ON',
        textOff: 'OFF',
        horizontalAlignment: 'Left'
    }),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin));