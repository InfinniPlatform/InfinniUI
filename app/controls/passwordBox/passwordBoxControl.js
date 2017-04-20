/**
 *
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
var PasswordBoxControl = function() {
    _.superClass( PasswordBoxControl, this );
    this.initialize_editorBaseControl();
};

_.inherit( PasswordBoxControl, Control );

_.extend( PasswordBoxControl.prototype, /** @lends PasswordBoxControl.prototype */ {

    createControlModel: function() {
        return new PasswordBoxModel();
    },

    createControlView: function( model ) {
        return new PasswordBoxView( { model: model } );
    }

}, editorBaseControlMixin );