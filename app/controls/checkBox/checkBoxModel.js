/**
 *
 * @constructor
 */
var CheckBoxModel = ControlModel.extend( _.extend( {

    defaults: _.defaults( {
        value: false
    }, ControlModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin ) );

InfinniUI.CheckBoxModel = CheckBoxModel;
