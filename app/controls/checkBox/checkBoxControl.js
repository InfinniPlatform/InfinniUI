/**
 *
 * @param parent
 * @constructor
 */
function CheckBoxControl( parent ) {
    _.superClass( CheckBoxControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( CheckBoxControl, Control );

_.extend( CheckBoxControl.prototype, {

    /**
     *
     * @returns {CheckBoxModel}
     */
    createControlModel: function() {
        return new CheckBoxModel();
    },

    /**
     *
     * @param model
     *
     */
    createControlView: function( model ) {
        return new CheckBoxView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.CheckBoxControl = CheckBoxControl;
