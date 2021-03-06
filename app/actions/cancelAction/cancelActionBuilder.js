/**
 *
 * @constructor
 */
function CancelActionBuilder() {
}

_.extend( CancelActionBuilder.prototype, baseActionBuilderMixin, {

    /**
     *
     * @param context
     * @param args
     * @returns {CancelAction}
     */
    build: function( context, args ) {
        var action = new CancelAction( args.parentView );

        this.applyBaseActionMetadata( action, args );

        return action;
    }

} );

InfinniUI.CancelActionBuilder = CancelActionBuilder;
