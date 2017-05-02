function MetadataViewBuilder() {
    _.superClass( MetadataViewBuilder, this );
}

_.inherit( MetadataViewBuilder, LinkViewBuilderBase );

InfinniUI.MetadataViewBuilder = MetadataViewBuilder;

_.extend( MetadataViewBuilder.prototype, {

    getViewTemplate: function( params, parentView ) {
        var that = this;
        var metadataDataSourceBuildProps = {
            metadata: params.metadata,
            applicationView: parentView && parentView.getApplicationView()
        };

        return function( onViewReadyHandler ) {
            var metadataProvider = InfinniUI.providerRegister.build( 'MetadataDataSource', metadataDataSourceBuildProps );

            metadataProvider.getMetadata( function( viewMetadata ) {
                if( viewMetadata === null || typeof viewMetadata === 'undefined' ) {
                    InfinniUI.global.logger.error( 'view metadata not found' );
                    InfinniUI.global.messageBus.send( messageTypes.onViewBuildError, {
                        error: 'metadata not found',
                        metadata: metadata
                    } );
                    return;
                }

                var onReady = function() {
                    var args = Array.prototype.slice.call( arguments );
                    onViewReadyHandler.apply( null, args );
                };

                that.buildViewByMetadata( params, viewMetadata, parentView, onReady );
            } );
        };
    }

} );
