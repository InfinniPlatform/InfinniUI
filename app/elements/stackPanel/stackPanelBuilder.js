/**
 * @constructor
 * @augments ContainerBuilder
 */
function StackPanelBuilder() {
    _.superClass( StackPanelBuilder, this );
}

InfinniUI.StackPanelBuilder = StackPanelBuilder;

_.inherit( StackPanelBuilder, ContainerBuilder );

_.extend( StackPanelBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {StackPanel}
     */
    createElement: function( params ) {
        return new StackPanel( params.parent, params.metadata[ 'ViewMode' ] );
    },

    /**
     * @param {Object} params
     * @param {StackPanel} params.element
     * @param {Object} params.metadata
     * @returns {*}
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var result = ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setOrientation( metadata.Orientation );

        return result;
    }

} );
