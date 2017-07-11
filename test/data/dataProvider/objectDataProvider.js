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

    beforeEach( cleanup );
    afterEach( cleanup );

    it( 'should check ValidationResult', function( done ) {

        InfinniUI.global.messageBus.subscribe( InfinniUI.messageTypes.onNotifyUser, function( context, args ) {
            assert.equal( args.value.messageText, 'Удаляемый элемент не найден' );
            done();
        } );

        var metadata = {};
        var builder = new InfinniUI.ApplicationBuilder();

        InfinniUI.providerRegister.register( 'ObjectDataSource', InfinniUI.Providers.ObjectDataProvider );
        var dataSource = builder.buildType( 'ObjectDataSource', metadata, { parentView: fakeView() } );
        dataSource._setItems( dataItems );

        dataSource.updateItems(
            function() {
                dataSource.deleteItem( {
                    '_id': 2,
                    'FirstName': 'Вася',
                    'LastName': 'Петров'
                } );
            }
        );
    } );

    function cleanup() {
        InfinniUI.global.messageBus.dispose();
    }

} );
