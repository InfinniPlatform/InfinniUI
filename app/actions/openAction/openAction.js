function OpenAction( parentView ) {
    _.superClass( OpenAction, this, parentView );
}

_.inherit( OpenAction, BaseAction );

_.extend( OpenAction.prototype, {

    execute: function( callback ) {
        var linkView = this.getProperty( 'linkView' );
        var that = this;

        linkView.createView( function( view ) {
            view.onLoaded( function() {
                that.onExecutedHandler();

                if ( callback ) {
                    callback( view );
                }
            } );

            view.open();
        } );
    }

} );

InfinniUI.OpenAction = OpenAction;
