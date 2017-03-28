function CreateItemAction() {
    _.superClass( CreateItemAction, this );
}

_.inherit( CreateItemAction, BaseAction );

_.extend( CreateItemAction.prototype, {

    execute: function( callback ) {
        var destinationDataSource = this.getProperty( 'destinationDataSource' );
        var destinationProperty = this.getProperty( 'destinationProperty' ) || "";

        if( !destinationDataSource ) {
            return;
        }

        if( !destinationProperty || this._isRootElementPath( destinationProperty ) ) {
            destinationDataSource.createItem( function( context, args ) {
                if( callback ) {
                    callback();
                }
            } );
        } else {
            var items = destinationDataSource.getProperty( destinationProperty ) || [];

            items = _.clone( items );
            items.push( {} );

            destinationDataSource.setProperty( destinationProperty, items );

            if( callback ) {
                callback();
            }
        }
    }

} );

window.InfinniUI.CreateItemAction = CreateItemAction;
