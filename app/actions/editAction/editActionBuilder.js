/**
 *
 * @constructor
 */
function EditActionBuilder() {
}

_.extend( EditActionBuilder.prototype, baseActionBuilderMixin, baseEditActionBuilderMixin, {

    /**
     *
     * @param context
     * @param args
     * @returns {EditAction}
     */
    build: function( context, args ) {
        var action = new EditAction( args.parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseEditActionMetadata( action, args );

        return action;
    }

} );

InfinniUI.EditActionBuilder = EditActionBuilder;
