function UpdateAction( parentView ) {
    _.superClass( UpdateAction, this, parentView );
}

_.inherit( UpdateAction, BaseAction );

_.extend( UpdateAction.prototype, baseFallibleActionMixin, {

    execute: function( callback ) {
        var that = this;
        var dataSource = this.getProperty( 'dataSource' );
        var onSuccessUpdate = function( context, args ) {
            that.onExecutedHandler( args );
            that.onSuccessHandler( args );

            if( typeof callback === 'function' ) {
                callback( context, args );
            }
        };
        var onErrorUpdate = function( context, args ) {
            that.onExecutedHandler( args );
            that.onErrorHandler( args );

            if( typeof callback === 'function' ) {
                callback( context, args );
            }
        };

        dataSource.updateItems( onSuccessUpdate, onErrorUpdate );
    }

} );

InfinniUI.UpdateAction = UpdateAction;
