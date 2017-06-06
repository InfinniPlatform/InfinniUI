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

    /**
     * @returns {IconModel}
     */
    createControlModel: function() {
        return new IconModel();
    },

    /**
     * @returns {IconView}
     * @param model
     */
    createControlView: function( model ) {
        return new IconView( { model: model } );
    }

} );

InfinniUI.IconControl = IconControl;
