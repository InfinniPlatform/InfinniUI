function InlineViewBuilder() {
    _.superClass( InlineViewBuilder, this );
}

_.inherit( InlineViewBuilder, LinkViewBuilderBase );

window.InfinniUI.InlineViewBuilder = InlineViewBuilder;

_.extend( InlineViewBuilder.prototype, {

    getViewTemplate: function( args, parentView ) {
        var that = this;

        return function( onViewReadyHandler ) {
            that.buildViewByMetadata( args, args.metadata[ 'View' ], parentView, function( view ) {
                return onViewReadyHandler.call( null, view );
            } );
        };
    }

} );
