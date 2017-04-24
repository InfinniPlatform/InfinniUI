var ToggleButtonModel = ControlModel.extend( _.extend( {

    defaults: _.defaults( {
        value: false,
        textOn: 'ON',
        textOff: 'OFF',
        horizontalAlignment: 'Left'
    }, ControlModel.prototype.defaults ),

    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin ) );

InfinniUI.ToggleButtonModel = ToggleButtonModel;
