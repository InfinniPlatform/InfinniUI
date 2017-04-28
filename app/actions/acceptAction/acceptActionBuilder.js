/**
 *
 * @constructor
 */
function AcceptActionBuilder() {
}

_.extend( AcceptActionBuilder.prototype, baseActionBuilderMixin, {

    /**
     *
     * @param context
     * @param args
     * @returns {AcceptAction}
     */
    build: function( context, args ) {
        var action = new AcceptAction( args.parentView );

        this.applyBaseActionMetadata( action, args );

        return action;
    }

} );

InfinniUI.AcceptActionBuilder = AcceptActionBuilder;
