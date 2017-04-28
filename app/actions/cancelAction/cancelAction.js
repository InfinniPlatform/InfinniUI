/**
 *
 * @param parentView
 * @constructor
 */
function CancelAction( parentView ) {
    _.superClass( CancelAction, this, parentView );
}

_.inherit( CancelAction, BaseAction );

_.extend( CancelAction.prototype, {

    /**
     *
     * @param callback
     */
    execute: function( callback ) {
        var that = this;

        this.parentView.onClosed( function() {
            that.onExecutedHandler();

            if ( callback ) {
                callback();
            }
        } );

        this.parentView.setDialogResult( DialogResult.canceled );
        this.parentView.close();
    }

} );

InfinniUI.CancelAction = CancelAction;
