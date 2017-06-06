/**
 * @constructor
 * @augments ButtonControl
 */
function LinkElementControl() {
    _.superClass( LinkElementControl, this );
}

_.inherit( LinkElementControl, ButtonControl );

_.extend( LinkElementControl.prototype, {

    /**
     * @returns {LinkElementModel}
     */
    createControlModel: function() {
        return new LinkElementModel();
    },

    /**
     * @returns {LinkElementView}
     * @param model
     */
    createControlView: function( model ) {
        return new LinkElementView( { model: model } );
    }

} );

InfinniUI.LinkElementControl = LinkElementControl;
