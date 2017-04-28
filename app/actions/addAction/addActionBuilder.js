/**
 *
 * @constructor
 */
function AddActionBuilder() {
}

_.extend( AddActionBuilder.prototype, baseActionBuilderMixin, baseEditActionBuilderMixin, {

    /**
     *
     * @param context
     * @param args
     * @returns {AddAction}
     */
    build: function( context, args ) {
        var action = new AddAction( args.parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseEditActionMetadata( action, args );

        return action;
    }

} );

InfinniUI.AddActionBuilder = AddActionBuilder;
