describe( 'ObjectDataSource', function() {
    var items = [
        {
            '_id': '1',
            'FirstName': 'Иван',
            'LastName': 'Иванов'
        },
        {
            '_id': '2',
            'FirstName': 'Петр',
            'LastName': 'Петров'
        },
        {
            '_id': '3',
            'FirstName': 'Иван1',
            'LastName': 'Иванов1'
        },
        {
            '_id': '4',
            'FirstName': 'Петр2',
            'LastName': 'Петров2'
        },
        {
            '_id': '5',
            'FirstName': 'Иван3',
            'LastName': 'Иванов3'
        },
        {
            '_id': '6',
            'FirstName': 'Петр4',
            'LastName': 'Петров5'
        },
        {
            '_id': '10',
            'FirstName': 'Анна',
            'LastName': 'Сергеева'

        }
    ];

    InfinniUI.providerRegister.register( 'ObjectDataSource', InfinniUI.Providers.ObjectDataProvider );

    function createObjectDataSource( metadata ) {

        metadata = metadata || {};

        var builder = new InfinniUI.ApplicationBuilder();
        var view = fakeView();
        var dataSource = builder.buildType( 'ObjectDataSource', metadata, { parent: view, parentView: view, builder: builder } ),
            initItems = JSON.parse( JSON.stringify( items ) );

        dataSource.setItems( initItems );

        return dataSource;
    }

    describe( 'ObjectDataSource base api', function() {
        it( 'should get list of data', function() {
            // Given //When
            var dataSource = createObjectDataSource(),
                items = dataSource.getItems();

            // Then
            assert.isTrue( dataSource.isDataReady(), 'dataReady status is right' );
            assert.isTrue( items.length > 0, 'data provider returns items' );
        } );

        it( 'should create document', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            //When
            dataSource.createItem(
                function( context, argument ) {

                    // Then
                    var newItem = argument.value;
                    assert.ok( newItem, 'new item is ready' );
                    assert.ok( newItem._id, 'new item has _id' );
                    done();
                }
            );
        } );

        it( 'should get document property', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            //When
            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {
                // Then
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Иван', 'return property value by simple property' );
                assert.equal( dataSource.getProperty( '$.FirstName' ), 'Иван', 'return property value by relative property' );
                assert.equal( dataSource.getProperty( '$' ).FirstName, 'Иван', 'return property - full item by $ selector' );
                done();
            }
        } );

        it( 'should select item', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {
                var items = dataSource.getItems();
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Иван', 'return property value by simple property' );

                //When
                dataSource.setSelectedItem( items[ 1 ] );

                // Then
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Петр', 'return property value by simple property after change selected item' );
                done();
            }
        } );

        it( 'should change document property', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Иван', 'return property value by property' );

                //When
                dataSource.setProperty( 'FirstName', 'Иванидзе' );

                // Then
                assert.equal( dataSource.getProperty( '$' ).FirstName, 'Иванидзе', 'return property value by property after change property' );
                done();
            }
        } );

        it( 'should change document property (full item change)', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Иван', 'return property value by property' );

                //When
                var newItemData = {
                    '_id': '1',
                    'FirstName': 'Ивано',
                    'LastName': 'Иванович'
                };
                dataSource.setProperty( '$', newItemData );

                // Then
                assert.equal( dataSource.getProperty( '$' ).FirstName, 'Ивано', 'return property value by property after change property' );
                done();
            }
        } );

        it( 'should get ValidationResult for item', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.setErrorValidator( validator );
            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {

                //When
                var items = dataSource.getItems(),
                    validateResult1 = dataSource.getValidationResult( items[ 0 ] ),
                    validateResult2 = dataSource.getValidationResult( items[ 1 ] ),
                    validateResult3 = dataSource.getValidationResult();

                // Then
                assert.isTrue( validateResult1.IsValid, 'successfully validation' );

                assert.isFalse( validateResult2.IsValid, 'fail validation' );
                assert.lengthOf( validateResult2.Items, 1, 'fail validation results' );
                assert.equal( validateResult2.Items[ 0 ].property, 'FirstName', 'fail validation property result' );

                assert.isFalse( validateResult3.IsValid, 'full validation' );
                assert.lengthOf( validateResult3.Items, 6, 'full validation results' );
                assert.equal( validateResult3.Items[ 3 ].property, '4.FirstName', 'full validation property result' );
                done();
            }

            function validator( context, argument ) {
                var result = {
                    IsValid: true
                };

                if( argument.FirstName != 'Иван' ) {
                    result.IsValid = false;
                    result.Items = [{
                        property: 'FirstName',
                        message: 'Почему не Иван?!'
                    }];
                }

                return result;
            }
        } );

        it( 'should save item', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.updateItems( handleItemsReady1 );

            function handleItemsReady1() {

                //When
                var item = dataSource.getSelectedItem();

                dataSource.setProperty( 'FirstName', 'Иванидзе' );
                dataSource.saveItem( item );

                dataSource.updateItems( handleItemsReady2 );
            }

            function handleItemsReady2() {
                // Then
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Иванидзе', 'item is saved' );
                done();
            }
        } );

        it( 'should delete item', function( done ) {
            // Given
            var dataSource = createObjectDataSource();

            dataSource.updateItems( handleItemsReady1 );

            function handleItemsReady1() {

                //When
                var items = dataSource.getItems(),
                    itemsCount = items.length;

                dataSource.deleteItem( items[ 0 ], function( context, argument ) {
                    // Then
                    items = dataSource.getItems();
                    assert.lengthOf( items, itemsCount - 1, 'items length is decrease' );
                    assert.equal( dataSource.getSelectedItem(), null, 'deleted item exclude from selected item' );
                    done();
                } );
            }
        } );

        it( 'should subscribe on itemsUpdated from metadata', function( done ) {
            var metadata = {
                OnItemsUpdated: '{window.testCount = window.testCount || 0; window.testCount++; window.testArgs = args; window.testContext = context;}'
            };

            // Given
            var dataSource = createObjectDataSource( metadata );

            //When
            dataSource.updateItems( handleItemsReady1 );

            function handleItemsReady1() {
                // Then
                assert.equal( window.testCount, 1, 'on items updated was called right times' );
                assert.isTrue( !!window.testArgs, 'on items updated handler passed args' );
                assert.isTrue( !!window.testContext, 'on items updated handler passed context' );

                delete window[ 'testCount' ];
                delete window[ 'testArgs' ];
                delete window[ 'testContext' ];

                done();
            }
        } );
    } );
} );
