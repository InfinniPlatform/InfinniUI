describe( 'ObjectDataProvider', function() {

    var dataItems = [
        {
            '_id': 1,
            'FirstName': 'Иван',
            'LastName': 'Иванов'
        },
        {
            '_id': 2,
            'FirstName': 'Петр',
            'LastName': 'Петров'
        }
    ];

    it( 'should check ValidationResult', function( done ) {

        InfinniUI.global.messageBus.subscribe( messageTypes.onNotifyUser, function( context, args ) {
            assert.equal( args.value.messageText, 'Удаляемый элемент не найден' );
            done();
        } );

        var metadata = {};
        var builder = new InfinniUI.ApplicationBuilder();

        window.InfinniUI.providerRegister.register( 'ObjectDataSource', window.InfinniUI.Providers.ObjectDataProvider );
        var dataSource = builder.buildType( 'ObjectDataSource', metadata, { parentView: fakeView() } );
        dataSource._setItems( dataItems );

        dataSource.updateItems(
            function() {
                dataSource.deleteItem( dataItems[ 0 ] );
            }
        );
    } );

} );