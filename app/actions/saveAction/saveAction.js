function SaveAction( parentView ) {
    _.superClass( SaveAction, this, parentView );
}

_.inherit( SaveAction, BaseAction );

_.extend( SaveAction.prototype, baseFallibleActionMixin, {

    execute: function( callback ) {
        var parentView = this.parentView;
        var dataSource = this.getProperty( 'dataSource' );
        var canClose = this.getProperty( 'canClose' );
        var that = this;
        var onSuccessSave = function( context, args ) {
            parentView.setDialogResult( DialogResult.accepted );

            if( canClose !== false ) {
                parentView.close();
            }

            that.onExecutedHandler( args );
            that.onSuccessHandler( args );

            if( typeof callback === 'function' ) {
                callback( context, args );
            }
        };
        var onErrorSave = function( context, args ) {
            that.onExecutedHandler( args );
            that.onErrorHandler( args );

            if( typeof callback === 'function' ) {
                callback( context, args );
            }
        };

        var selectedItem = dataSource.getSelectedItem();

        dataSource.saveItem( selectedItem, onSuccessSave, onErrorSave );
    }

} );

window.InfinniUI.SaveAction = SaveAction;
