describe('ViewBuilder', function () {

    /*it('should build Container and Element metadata', function () {
     // Given
     var viewBuilder = new ViewBuilder();
     var metadata = {
     Name: 'my_view',
     Items: []
     };

     // When
     var view = viewBuilder.build(null, {metadata: metadata});

     // Then
     assert.equal(view.getName(), 'my_view');
     });*/

    it('should build Icon', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Icon: 'Icon'
        };

        // When
        var view = viewBuilder.build(null, {metadata: metadata});

        // Then
        assert.equal(view.getIcon(), 'Icon');
    });


    it('should build Scripts', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
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

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});

        // Then
        assert.equal(view.getScripts().length, 2);

        var script = view.getScripts().pop();
        assert.property(script, 'name');
        assert.property(script, 'func');
        assert.instanceOf(script.func, Script);
    });

    it('should build Parameters', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Parameters: [
                {
                    Name: 'param1',
                    Value: {},
                    OnPropertyChanged: 'OnParameterChanged'
                }
            ]
        };

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});

        // Then
        assert.equal(view.getParameters().length, 1);
        assert.instanceOf(view.getParameters().pop(), Parameter);
    });

    it('should build DataSources', function () {
        // Given
        window.providerRegister.register('DocumentDataSource', FakeDataProvider);
        window.providerRegister.register('ObjectDataSource', ObjectDataProvider);

        var viewBuilder = new ViewBuilder();
        var metadata = {
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
            ]
        };

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});
        var dataSources = view.getDataSources();

        // Then
        assert.equal(dataSources.length, 2);
        assert.instanceOf(dataSources.find(function(item){ return item.getName() == 'documentDataSource1'; }), DocumentDataSource, 'wrong build for DocumentDataSource');
        assert.instanceOf(dataSources.find(function(item){ return item.getName() == 'objectDataSource1'; }), ObjectDataSource, 'wrong build for ObjectDataSource');
    });


    it('should build OnOpening', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Scripts: [
                {
                    Name: 'onOpening',
                    Body: 'window.EventOnOpeningWasCall = true;'
                }
            ],
            OnOpening: 'onOpening'
        };

        window.EventOnOpeningWasCall = false;

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});
        view.open();

        // Then
        assert.isTrue(window.EventOnOpeningWasCall);
    });

    it('should build OnOpened', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Scripts: [
                {
                    Name: 'onOpened',
                    Body: 'window.EventOnOpenedWasCall = true;'
                }
            ],
            OnOpened: 'onOpened'
        };

        window.EventOnOpenedWasCall = false;

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});
        view.open();

        // Then
        assert.isTrue(window.EventOnOpenedWasCall);
    });

    it('should build OnClosing', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Scripts: [
                {
                    Name: 'onClosing',
                    Body: 'window.EventOnClosingWasCall = true;'
                }
            ],
            OnClosing: 'onClosing'
        };

        window.EventOnClosingWasCall = false;

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});
        view.close();

        // Then
        assert.isTrue(window.EventOnClosingWasCall);
    });

    it('should build OnClosed', function () {
        // Given
        var viewBuilder = new ViewBuilder();
        var metadata = {
            Scripts: [
                {
                    Name: 'onClosed',
                    Body: 'window.EventOnClosedWasCall = true;'
                }
            ],
            OnClosed: 'onClosed'
        };

        window.EventOnClosedWasCall = false;

        // When
        var view = viewBuilder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});
        view.close();

        // Then
        assert.isTrue(window.EventOnClosedWasCall);
    });
});