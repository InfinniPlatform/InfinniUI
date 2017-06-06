/**
 * @constructor
 * @augments ContainerBuilder
 */
function ScrollPanelBuilder() {
    _.superClass( ScrollPanelBuilder, this );
}

InfinniUI.ScrollPanelBuilder = ScrollPanelBuilder;

_.inherit( ScrollPanelBuilder, ContainerBuilder );

_.extend( ScrollPanelBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {ScrollPanel}
     */
    createElement: function( params ) {
        return new ScrollPanel( params.parent );
    },

    /**
     * @param {Object} params
     * @param {Panel} params.element
     * @param {Object} params.metadata
     * @returns {*}
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;

        var data = ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setHorizontalScroll( metadata.HorizontalScroll );
        element.setVerticalScroll( metadata.VerticalScroll );

        return data;
    }

} );
