/**
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
var PasswordBoxControl = function() {
    _.superClass( PasswordBoxControl, this );
    this.initialize_editorBaseControl();
};

_.inherit( PasswordBoxControl, Control );

_.extend( PasswordBoxControl.prototype, {

    /**
     * @returns {PasswordBoxModel}
     */
    createControlModel: function() {
        return new PasswordBoxModel();
    },

    /**
     * @returns {PasswordBoxView}
     * @param model
     */
    createControlView: function( model ) {
        return new PasswordBoxView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.PasswordBoxControl = PasswordBoxControl;
