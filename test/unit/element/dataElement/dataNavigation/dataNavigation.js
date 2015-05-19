describe('DataNavigation', function () {
    it('should pass test default property', function () {
        // Given
        var dataNavigationBuilder = new DataNavigationBuilder();
        var view = new View();
        view.setGuid(guid());
        var metadata = {
            Enabled: true,
            PageNumber: 5,
            PageSize: 10,

            Name: "DataNavigation1",
            AvailablePageSizes: [ 20, 50, 100 ],
            DataSource: "PatientDataSource"
        };
        var dataNavigation = dataNavigationBuilder.build(dataNavigationBuilder, view, metadata);

        //When
        dataNavigation.setName('NewDataNavigation');

        //Then
        assert.equal(dataNavigation.getName(), 'NewDataNavigation');
        assert.isTrue(dataNavigation.getEnabled());
        assert.isTrue(dataNavigation.getVisible());
        assert.equal(dataNavigation.getHorizontalAlignment(), 'Stretch');
        assert.equal(dataNavigation.getPageNumber(), metadata.PageNumber);
        assert.equal(dataNavigation.getPageSize(), metadata.PageSize);
        assert.equal(dataNavigation.getDataSource(), metadata.DataSource);
    });

    it('should handlers messageBus, onSetPageSize, onSetPageNumber', function () {
        // Given
        var dataNavigationBuilder = new DataNavigationBuilder();
        var view = new View();
        view.setGuid(guid());
        var metadata = {
            PageNumber: 5,
            PageSize: 10,

            Name: "DataNavigation1",
            //AvailablePageSizes: [ 20, 50, 100 ],
            DataSource: "PatientDataSource"
        };


        var exchange = view.getExchange();
        var dataNavigation = dataNavigationBuilder.build(dataNavigationBuilder, view, metadata);

        //Then
        exchange.subscribe(messageTypes.onSetPageSize, function (messageBody) {
            assert.equal(messageBody.value, 123);
            assert.equal(messageBody.dataSource, metadata.DataSource);
        });

        exchange.subscribe(messageTypes.onSetPageNumber, function (messageBody) {
            assert.equal(messageBody.value, 10);
            assert.equal(messageBody.dataSource, metadata.DataSource);
        });

        // When
        dataNavigation.setPageSize(123);
        dataNavigation.setPageNumber(10);
    });

    it('should be true if scriptsHandlers call', function () {
        //Given
        var dataNavigation = new DataNavigationBuilder();
        var view = new View();
        view.setGuid(guid());
        var metadata = {
            OnSetPageSize:{
                Name: 'OnSetPageSize'
            },
            OnSetPageNumber:{
                Name: 'OnSetPageNumber'
            },
            OnLoaded:{
                Name: 'OnLoaded'
            }
        };
        window.Test = {dataNavigation:{ps: 1, pn: 1, loaded: false}};
        view.setScripts([{Name:"OnSetPageSize", Body:"window.Test.dataNavigation.ps = 50"},{Name:"OnSetPageNumber", Body:"window.Test.dataNavigation.pn = 3"}, {Name:"OnLoaded", Body:"window.Test.dataNavigation.loaded = true"}]);

        //When
        var build = dataNavigation.build(dataNavigation, view, metadata);
        build.setPageSize(1);
        build.setPageNumber(1);
        $(build.render());

        // Then
        assert.equal(window.Test.dataNavigation.ps, 50);
        assert.equal(window.Test.dataNavigation.pn, 3);
        assert.isTrue(window.Test.dataNavigation.loaded);
    });
});