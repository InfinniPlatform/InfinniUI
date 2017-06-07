/**
 * @augments CheckBoxControl
 * @param parent
 * @constructor
 * @mixes editorBaseControlMixin
 */
function IndeterminateCheckBoxControl( parent ) {
    _.superClass( IndeterminateCheckBoxControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( IndeterminateCheckBoxControl, CheckBoxControl );

_.extend( IndeterminateCheckBoxControl.prototype, {

    /**
     * @returns {IndeterminateCheckBoxModel}
     */
    createControlModel: function() {
        return new IndeterminateCheckBoxModel();
    },

    /**
     * @returns {IndeterminateCheckBoxView}
     */
    createControlView: function( model ) {
        return new IndeterminateCheckBoxView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.IndeterminateCheckBoxControl = IndeterminateCheckBoxControl;
