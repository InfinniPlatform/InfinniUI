var LocalStorageDataSource = ObjectDataSource.extend( {

    initDataProvider: function() {
        var dataProvider = window.InfinniUI.providerRegister.build( 'LocalStorageDataSource' );
        this.set( 'dataProvider', dataProvider );
    }

} );

window.InfinniUI.providerRegister.register( 'LocalStorageDataSource', InfinniUI.Providers.LocalStorageDataProvider );
window.InfinniUI.LocalStorageDataSource = LocalStorageDataSource;