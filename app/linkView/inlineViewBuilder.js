/**
 * @augments LinkViewBuilderBase
 * @constructor
 */
function InlineViewBuilder() {
    _.superClass( InlineViewBuilder, this );
}

_.inherit( InlineViewBuilder, LinkViewBuilderBase );

InfinniUI.InlineViewBuilder = InlineViewBuilder;

_.extend( InlineViewBuilder.prototype, {

    /**
     *
     * @param args
     * @param parentView
     * @returns {Function}
     */
    getViewTemplate: function( args, parentView ) {
        var that = this;

        return function( onViewReadyHandler ) {
            that.buildViewByMetadata( args, args.metadata[ 'View' ], parentView, function( view ) {
                return onViewReadyHandler.call( null, view );
            } );
        };
    }

} );
