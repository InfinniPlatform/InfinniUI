/**
 *
 * @param parent
 * @constructor
 */
function DataNavigationControl( parent ) {
    _.superClass( DataNavigationControl, this, parent );
}

_.inherit( DataNavigationControl, Control );

_.extend( DataNavigationControl.prototype, {

    /**
     *
     * @returns {DataNavigationModel}
     */
    createControlModel: function() {
        return new DataNavigationModel();
    },

    /**
     *
     * @param model
     * @returns {DataNavigationView}
     */
    createControlView: function( model ) {
        return new DataNavigationView( { model: model } );
    },

    /**
     *
     * @param handler
     */
    onPageNumberChanged: function( handler ) {
        this.controlModel.onPageNumberChanged( handler );
    },

    /**
     *
     * @param handler
     */
    onPageSizeChanged: function( handler ) {
        this.controlModel.onPageSizeChanged( handler );
    }

} );

InfinniUI.DataNavigationControl = DataNavigationControl;
