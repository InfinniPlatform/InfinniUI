/**
 *
 * @constructor
 * @augments Control
 */
function IconControl() {
    _.superClass( IconControl, this );
}

_.inherit( IconControl, Control );

_.extend( IconControl.prototype, {

    createControlModel: function() {
        return new IconModel();
    },

    createControlView: function( model ) {
        return new IconView( { model: model } );
    }

} );

InfinniUI.IconControl = IconControl;
