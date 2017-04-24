function AcceptAction( parentView ) {
    _.superClass( AcceptAction, this, parentView );
}

_.inherit( AcceptAction, BaseAction );

_.extend( AcceptAction.prototype, {

    execute: function( callback ) {
        var that = this;

        this.parentView.onClosed( function() {
            that.onExecutedHandler();

            if( callback ) {
                callback();
            }
        } );

        this.parentView.setDialogResult( DialogResult.accepted );
        this.parentView.close();
    }

} );

InfinniUI.AcceptAction = AcceptAction;
