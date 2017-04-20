describe( 'LocalStorageDataSource', function() {
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

    window.InfinniUI.localStorageDataSource = new window.InfinniUI.LocalStorageDataSource( {
        view: fakeView()
    } );

    function createLocalStorageDataSource( onItemsUpdated ) {
        // clear LocalStorage
        localStorage.clear();

        var dataSource = window.InfinniUI.localStorageDataSource;
        var initItems = JSON.parse( JSON.stringify( items ) );

        if( onItemsUpdated ) {
            dataSource.onItemsUpdated( onItemsUpdated );
        }
        dataSource.setItems( initItems );

        return dataSource;
    }

    describe( 'LocalStorageDataSource base api', function() {
        it( 'should get list of data', function() {
            // Given //When
            var dataSource = createLocalStorageDataSource();
            var items = dataSource.getItems();

            // Then
            assert.isTrue( dataSource.isDataReady(), 'dataReady status is right' );
            assert.isTrue( items.length > 0, 'data provider returns items' );
            assert.isTrue( localStorage.getItem( 'items' ) !== '', 'data provider write data to localStorage' );
        } );

        it( 'should create document', function( done ) {
            // Given
            var dataSource = createLocalStorageDataSource();

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
            var dataSource = createLocalStorageDataSource();

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
            var dataSource = createLocalStorageDataSource();

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
            var dataSource = createLocalStorageDataSource();

            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {

                //When
                dataSource.setProperty( 'FirstName', 'Иванидзе' );

                // Then
                assert.equal( dataSource.getProperty( '$' ).FirstName, 'Иванидзе', 'return property value by property after change property' );
                done();
            }
        } );

        it( 'should change document property (full item change)', function( done ) {
            // Given
            var dataSource = createLocalStorageDataSource();

            dataSource.updateItems( handleItemsReady );

            function handleItemsReady() {
                assert.equal( dataSource.getProperty( 'FirstName' ), 'Петр', 'return property value by property' );

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
            var dataSource = createLocalStorageDataSource();

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
                    result.Items = [ {
                        property: 'FirstName',
                        message: 'Почему не Иван?!'
                    } ];
                }

                return result;
            }
        } );

        it( 'should save item', function( done ) {
            // Given
            var dataSource = createLocalStorageDataSource();
            dataSource.setErrorValidator( null );

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
            var dataSource = createLocalStorageDataSource();

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
            var callback =  function( context, args ) {
                window.testCountLS = window.testCountLS || 0;
                window.testCountLS++;
                window.testArgsLS = args;
                window.testContextLS = context;
            };

            // Given
            var dataSource = createLocalStorageDataSource( callback );

            //When
            dataSource.updateItems( handleItemsReady1 );

            function handleItemsReady1() {
                // Then
                assert.equal( window.testCountLS, 1, 'on items updated was called right times' );
                assert.isTrue( !!window.testArgsLS, 'on items updated handler passed args' );
                assert.isTrue( !!window.testContextLS, 'on items updated handler passed context' );

                delete window[ 'testCountLS' ];
                delete window[ 'testArgsLS' ];
                delete window[ 'testContextLS' ];

                done();
            }
        } );

        it( 'should work binding', function( done ) {

            var viewBuilder = new InfinniUI.ViewBuilder();
            var dataSource = createLocalStorageDataSource();
            var view1;
            var view2;
            var metadata1 = {
                Name: 'my_view1',
                Items: [
                    {
                        Label: {
                            Name: 'Label1',
                            Value: {
                                Source: 'LocalStorageDS',
                                Property: '0.FirstName'
                            }
                        }
                    }
                ]
            };
            var metadata2 = {
                Name: 'my_view2',
                Items: [
                    {
                        Label: {
                            Name: 'Label2',
                            Value: {
                                Source: 'LocalStorageDS',
                                Property: '0.FirstName'
                            }
                        }
                    }
                ]
            };


            testHelper.applyViewMetadata( metadata1, function( view ) {
                view1 = view;

                testHelper.applyViewMetadata( metadata2, function( view ) {
                    view2 = view;

                    var label1 = view1.context.controls[ 'Label1' ];
                    var label2 = view2.context.controls[ 'Label2' ];

                    label1.setValue( 'Валера' );

                    assert.equal( label2.getValue(), 'Валера', 'second label updated value' );
                    assert.equal( label1.getValue(), label2.getValue(), 'labels have equal values' );

                    view1.close();
                    view2.close();

                    localStorage.clear();

                    done();
                } );
            } );

        } );
    } );
} );
