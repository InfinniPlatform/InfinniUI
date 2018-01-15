/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var PasswordBoxModel = ControlModel.extend( _.extend( {

    defaults: _.defaults(
        {
            labelText: null,
            autocomplete: true
        },
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults
    ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin ) );

InfinniUI.PasswordBoxModel = PasswordBoxModel;
