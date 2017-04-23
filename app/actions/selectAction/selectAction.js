function SelectAction( parentView ) {
    _.superClass( SelectAction, this, parentView );
}

_.inherit( SelectAction, BaseAction );

_.extend( SelectAction.prototype, {

    execute: function( callback ) {
        var that = this;
        var parentView = this.parentView;
        var linkView = this.getProperty( 'linkView' );
        var srcDataSourceName = this.getProperty( 'sourceSource' );
        var srcPropertyName = this.getProperty( 'sourceProperty' );
        var dstDataSourceName = this.getProperty( 'destinationSource' );
        var dstPropertyName = this.getProperty( 'destinationProperty' );

        linkView.createView( function( createdView ) {
            createdView.onClosed( function( context, args ) {
                var dialogResult = createdView.getDialogResult();

                if( dialogResult == DialogResult.accepted ) {
                    var srcDataSource = createdView.getContext().dataSources[ srcDataSourceName ];
                    var dstDataSource = parentView.getContext().dataSources[ dstDataSourceName ];
                    var value = srcDataSource.getProperty( srcPropertyName );

                    dstDataSource.setProperty( dstPropertyName, value );
                }

                that.onExecutedHandler( args );

                if( callback ) {
                    callback( context, args );
                }
            } );

            createdView.open();
        } );
    }

} );

window.InfinniUI.SelectAction = SelectAction;
