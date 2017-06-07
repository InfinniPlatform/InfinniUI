/**
 * @augments ElementBuilder
 * @constructor
 */
function ViewPanelBuilder() {
}

InfinniUI.ViewPanelBuilder = ViewPanelBuilder;

_.inherit( ViewPanelBuilder, ElementBuilder );

_.extend( ViewPanelBuilder.prototype, {

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );

        var builder = params.builder;
        var panel = params.element;
        var metadata = params.metadata;

        /* Помощь для обработки OpenMode = Inline */
        if( _.isEmpty( metadata.Name ) ) {
            metadata.Name = guid();
            panel.setName( metadata.Name );
        }

        InfinniUI.global.containers[ metadata.Name ] = panel;

        if( 'LinkView' in metadata ) {
            var linkView = builder.build( metadata[ 'LinkView' ], {
                parentView: params.parentView,
                parent: params.element
            } );

            linkView.setOpenMode( 'Container' );
            linkView.setContainer( metadata.Name );
            linkView.createView( function( view ) {
                view.open();
            } );
        }
    },

    /**
     *
     * @param params
     * @returns {ViewPanel}
     */
    createElement: function( params ) {
        return new ViewPanel( params.parent );
    }

} );

InfinniUI.global.containers = {};
