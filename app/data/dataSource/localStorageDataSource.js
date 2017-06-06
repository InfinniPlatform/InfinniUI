/**
 * @constructor
 * @augments ObjectDataSource
 */
var LocalStorageDataSource = ObjectDataSource.extend( {

    /**
     *
     */
    initDataProvider: function() {
        var dataProvider = InfinniUI.providerRegister.build( 'LocalStorageDataSource' );
        this.set( 'dataProvider', dataProvider );
    }

} );

InfinniUI.providerRegister.register( 'LocalStorageDataSource', InfinniUI.Providers.LocalStorageDataProvider );
InfinniUI.LocalStorageDataSource = LocalStorageDataSource;
