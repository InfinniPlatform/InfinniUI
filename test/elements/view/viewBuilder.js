describe( 'ViewBuilder', function() {
    var viewMetadata = {
        Text: 'TestView',
        DataSources: [
            {
                DocumentDataSource: {
                    Name: 'documentDataSource1',
                    ConfigId: 'configuration',
                    DocumentId: 'document'
                }
            },
            {
                ObjectDataSource: {
                    Name: 'objectDataSource1',
                    Items: [
                        { Id: 1, Display: 'first' },
                        { Id: 2, Display: 'second' }
                    ]
                }
            }
        ],

        Items: [{
            'TextBox': {
                'Name': 'TextBox1',
                'Value': {
                    'Source': 'objectDataSource1',
                    'Property': '$.Display'
                }
            }
        }],

        Parameters: [
            {
                Name: 'param1',
                OnPropertyChanged: 'OnParameterChanged'
            }
        ],

        Scripts: [
            {
                Name: 'script1',
                Body: ''
            },
            {
                Name: 'script2',
                Body: ''
            }
        ]
    };

    it( 'should build Container and Element metadata', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = {
            Name: 'my_view',
            Items: [
                {
                    StackPanel: {
                        GridPanel: {
                            Rows: []
                        }
                    }
                }
            ]
        };

        // When
        var view = viewBuilder.build( null, { metadata: metadata } );

        // Then
        assert.equal( view.getName(), 'my_view' );
        assert.instanceOf( view.getItems(), InfinniUI.Collection );
    } );

    it( 'should build Scripts', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = viewMetadata;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );

        // Then
        assert.equal( view.getScripts().length, 2 );

        var script = view.getScripts().pop();
        assert.property( script, 'name' );
        assert.property( script, 'func' );
        assert.instanceOf( script.func, Function );
    } );

    it( 'should build Parameters', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = viewMetadata;
        var param = new InfinniUI.Parameter( { name: 'param1' } );

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata, params: { param1: param } } );

        // Then
        assert.equal( view.getParameters().length, 1 );
        assert.instanceOf( view.getParameters().pop(), InfinniUI.Parameter );
    } );

    it( 'should build DataSources', function() {
        // Given
        InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );
        InfinniUI.providerRegister.register( 'ObjectDataSource', InfinniUI.Providers.ObjectDataProvider );

        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = viewMetadata;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );
        var dataSources = view.getDataSources();

        // Then
        assert.equal( dataSources.length, 2 );
        assert.instanceOf( dataSources.find( function( item ) { return item.getName() == 'documentDataSource1'; } ), InfinniUI.DocumentDataSource, 'wrong build for DocumentDataSource' );
        assert.instanceOf( dataSources.find( function( item ) { return item.getName() == 'objectDataSource1'; } ), InfinniUI.ObjectDataSource, 'wrong build for ObjectDataSource' );
    } );

    it( 'should sort DataSources by priority', function( done ) {
        // Given
        InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = {
            DataSources: [
                {
                    DocumentDataSource: {
                        Name: 'ds1',
                        ConfigId: 'configuration',
                        DocumentId: 'document'
                    }
                },
                {
                    DocumentDataSource: {
                        Name: 'ds2',
                        ConfigId: 'configuration',
                        DocumentId: 'document',
                        ResolvePriority: 1
                    }
                },
                {
                    DocumentDataSource: {
                        Name: 'ds3',
                        ConfigId: 'configuration',
                        DocumentId: 'document',
                        ResolvePriority: 2
                    }
                },
                {
                    DocumentDataSource: {
                        Name: 'ds4',
                        ConfigId: 'configuration',
                        DocumentId: 'document',
                        ResolvePriority: -11
                    }
                },
                {
                    DocumentDataSource: {
                        Name: 'ds5',
                        ConfigId: 'configuration',
                        DocumentId: 'document',
                        ResolvePriority: 1
                    }
                }
            ]
        };

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );

        var dataSources = view.getDataSources()._items.map( function( obj ) {return obj.__value;} ),
            ds4 = dataSources.find( function( item ) { return item.name == 'ds4'; } ),
            updatedDataSources = [];

        dataSources.forEach( function( ds ) {
            ds.onItemsUpdated( function( context, args ) { updatedDataSources.push( args.source.name ); } );
        } );

        ds4.onItemsUpdated( onDataSourcesReady );

        dataSources.forEach( function( ds ) {
            ds.updateItems();
        } );

        // Then
        function onDataSourcesReady() {
            assert.deepEqual( updatedDataSources, ['ds3', 'ds2', 'ds5', 'ds1', 'ds4'], 'priority ds must be resolved before nonpriority' );
            done();
        }
    } );


    it( 'should build OnOpening', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            Scripts: [
                {
                    Name: 'onOpening',
                    Body: 'window.EventOnOpeningWasCall = true;'
                }
            ],
            OnOpening: 'onOpening'
        } );

        window.EventOnOpeningWasCall = false;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );
        view.open();

        // Then
        assert.isTrue( window.EventOnOpeningWasCall );

        // cleaning
        view.close();
    } );

    it( 'should build OnOpened', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            Scripts: [
                {
                    Name: 'onOpened',
                    Body: 'window.EventOnOpenedWasCall = true;'
                }
            ],
            OnOpened: 'onOpened'
        } );

        window.EventOnOpenedWasCall = false;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );
        view.open();

        // Then
        assert.isTrue( window.EventOnOpenedWasCall );

        // cleaning
        view.close();
    } );

    it( 'should build OnClosing', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            Scripts: [
                {
                    Name: 'onClosing',
                    Body: 'window.EventOnClosingWasCall = true;'
                }
            ],
            OnClosing: 'onClosing'
        } );

        window.EventOnClosingWasCall = false;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );
        view.close();

        // Then
        assert.isTrue( window.EventOnClosingWasCall );
    } );

    it( 'should build OnClosed', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            Scripts: [
                {
                    Name: 'onClosed',
                    Body: 'window.EventOnClosedWasCall = true;'
                }
            ],
            OnClosed: 'onClosed'
        } );

        window.EventOnClosedWasCall = false;

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );
        view.close();

        // Then
        assert.isTrue( window.EventOnClosedWasCall );
    } );

    it( 'should build CloseButtonVisibility', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var builder = new InfinniUI.ApplicationBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            CloseButtonVisibility: false
        } );

        // When
        var view = viewBuilder.build( null, { metadata: metadata, builder: builder } );

        // Then
        assert.isFalse( view.getCloseButtonVisibility() );
    } );

    it( 'should build HeaderTemplate', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var metadata = _.extend( {}, viewMetadata, {
            HeaderTemplate: {
                Icon: {
                }
            }
        } );

        // When
        var view = viewBuilder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata } );

        // Then
        var headerTemplate = view.getHeaderTemplate();
        var header = headerTemplate();

        assert.instanceOf( header, InfinniUI.Icon );
    } );

    it( 'should build default value', function() {
        // Given
        var viewBuilder = new InfinniUI.ViewBuilder();
        var builder = new InfinniUI.ApplicationBuilder();
        var metadata = viewMetadata;

        // When
        var view = viewBuilder.build( null, { metadata: metadata, builder: builder } );

        // Then
        var headerTemplate = view.getHeaderTemplate();
        var header = headerTemplate();

        // Header
        assert.instanceOf( header, InfinniUI.Label );
        assert.equal( header.getValue(), 'TestView' );

        // CloseButtonVisibility
        assert.isTrue( view.getCloseButtonVisibility() );
    } );
} );
