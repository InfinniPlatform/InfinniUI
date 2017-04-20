describe( 'DataSourceBuilder', function() {

    var builder = new InfinniUI.ApplicationBuilder();
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

    FakeRestDataProvider.prototype.items = _.clone( items );

    describe( 'build DocumentDataSource', function() {

        it( 'should build documentDataSource', function() {
            // Given When
            var metadata = {
                Name: 'PatientDataSource',
                DocumentId: 'Patient',
                FillCreatedItem: true,
                PageNumber: 1,
                PageSize: 5,

                onPropertyChanged: 'onPropertyChanged'
            };

            var view = new InfinniUI.View(),
                createdDataSource = builder.buildType( 'DocumentDataSource', metadata, { parentView: view } );

            // Then
            assert.equal( createdDataSource.getDocumentId(), 'Patient' );
            assert.equal( createdDataSource.getIdProperty(), '_id' );
            assert.equal( createdDataSource.getPageSize(), 5, 'PageSize' );
            assert.equal( createdDataSource.getPageNumber(), 1, 'PageNumber' );
            assert.isTrue( createdDataSource.getFillCreatedItem(), 'Value of FillCreatedItem' );
        } );

        it( 'should subscribe documentDataSource on changeProperty', function( done ) {
            // Given
            window.InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

            var metadata = {
                Name: 'PatientDataSource',
                DocumentId: 'Patient',
                FillCreatedItem: true,
                PageNumber: 1,
                PageSize: 5,

                OnPropertyChanged: 'onPropertyChanged'
            };

            var view = new InfinniUI.View(),
                createdDataSource = builder.buildType( 'DocumentDataSource', metadata, { parentView: view } ),
                scriptMetadata = {
                    Name: 'onPropertyChanged',
                    Body: 'window.documentDataSourceTest = 1;'
                };

            view.getScripts().add( {
                name: 'onPropertyChanged',
                func: builder.buildType( 'Script', scriptMetadata, { parentView: view } )
            } );

            createdDataSource.updateItems( onItemUpdates );

            // When
            function onItemUpdates( context, args ) {
                createdDataSource.setProperty( 'FirstName', 'Иванидзе' );
            }

            // Then
            setTimeout( function() {
                assert.equal( window.documentDataSourceTest, 1, 'Event OnSelectedItemChanged is called' );
                done();
            }, 200 );
        } );

        it( 'should create ds from metadata', function( done ) {
            // Given
            window.InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        DocumentDataSource: {
                            'Name': 'DataSource1',
                            'DocumentId': 'Whatever'
                        }
                    }
                ],
                Items: []
            };

            var dataSource;

            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                dataSource = view.getContext().dataSources[ 'DataSource1' ];
                dataSource.updateItems( handleItemsReady );
            }

            function handleItemsReady() {
                assert.isTrue( dataSource.getItems().length > 0, 'DS was update items' );
                assert.equal( FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?skip=0&take=15', 'requested url is right' );

                done();
            }
        } );

        it( 'should update items on filter changing', function( done ) {
            // Given
            window.InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        DocumentDataSource: {
                            'Name': 'DataSource1',
                            'DocumentId': 'Whatever'
                        }
                    }
                ],
                Items: []
            };
            var result = '';

            var dataSource;

            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {

                $layout.detach();

                dataSource = view.getContext().dataSources[ 'DataSource1' ];

                dataSource.onItemsUpdated( function() {
                    result += '1';

                    if( result == '11' ) {
                        assert.equal( FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?filter=eq(id,7)&skip=0&take=15', 'requested url is right (second)' );
                        done();
                    }
                } );

                dataSource.setFilter( 'eq(id,4)' );

                dataSource.updateItems( handleItemsReady1 );
            }

            function handleItemsReady1() {
                assert.equal( result, '', 'its first updated of item' );
                assert.equal( FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?filter=eq(id,4)&skip=0&take=15', 'requested url is right (first)' );

                dataSource.setFilter( 'eq(id,<%uid%>)' );
                dataSource.setFilterParams( 'uid', 7 );
            }
        } );


        it( 'should bind filter', function( done ) {
            // Given
            FakeRestDataProvider.prototype.items = _.clone( items );
            window.InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        DocumentDataSource: {
                            'Name': 'DataSource1',
                            'DocumentId': 'Whatever',
                            'Filter': 'eq(_id,<%param%>)',
                            'FilterParams': {
                                'param': {
                                    'Source': 'DataSource2',
                                    'Property': '0._id'
                                }
                            }
                        }
                    }, {

                        DocumentDataSource: {
                            'Name': 'DataSource2',
                            'DocumentId': 'Whatever'
                        }
                    }
                ],
                Items: []
            };
            var result = '';

            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {

                $layout.detach();

                var dataSource1 = view.getContext().dataSources[ 'DataSource1' ];
                var dataSource2 = view.getContext().dataSources[ 'DataSource2' ];

                dataSource1.onItemsUpdated( function() {
                    assert.equal( result, '2', 'second updated ds1' );

                    result += '1';
                    dataSource2;
                    assert.equal( FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?filter=eq(_id,1)&skip=0&take=15', 'requested url is right (ds1)' );
                    done();
                } );

                dataSource2.onItemsUpdated( function() {

                    assert.equal( result, '', 'first updated ds2' );

                    result += '2';

                    dataSource1.updateItems();
                } );

            }

        } );

    } );

} );
