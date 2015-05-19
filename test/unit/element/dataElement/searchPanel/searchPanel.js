describe('SearchPanel', function () {
    it('Setting the default properties', function () {
        // Given
        var searchPanelBuilder = new SearchPanelBuilder();
        var builder = new Builder();
        var view = new View();
        var metadata = {
            Name: "SearchPanel1",
            DataSource: "PatientsDataSource"
        };
        var searchPanel = searchPanelBuilder.build(builder, view, metadata);

        //When
        searchPanel.setName('NewSearchPanel');
        searchPanel.setText('NewText');

        //Then
        assert.equal(searchPanel.getName(), 'NewSearchPanel');
        assert.isTrue(searchPanel.getEnabled());
        assert.equal(searchPanel.getHorizontalAlignment(), 'Stretch');
        assert.isTrue(searchPanel.getVisible());
        assert.equal(searchPanel.getText(), 'NewText');
    });

    it('Events setValue, exchange event', function (done) {
        // Given
        var searchPanelBuilder = new SearchPanelBuilder();
        var builder = new Builder();
        var view = new View();
        var metadata = {
            Name: "SearchPanel1",
            DataSource: "PatientsDataSource"
        };
        var exchange = view.getExchange();

        var searchPanel = searchPanelBuilder.build(builder, view, metadata);
        var $searchPanel = searchPanel.render();

        // When
        exchange.subscribe(messageTypes.onSetTextFilter, function (messageBody) {
            // Then
            assert.equal(messageBody.value, 123);
            assert.equal(messageBody.dataSource, 'PatientsDataSource');
            done();
        });
        searchPanel.setValue(123);
        $searchPanel.find('.btn_search').trigger('click');
    });

    it('should be true if scriptsHandlers call', function () {
        //Given
        var searchPanel = new SearchPanelBuilder();
        var view = new View();
        var metadata = {
            OnValueChanged:{
                Name: 'OnValueChanged'
            },
            OnLoaded:{
                Name: 'OnLoaded'
            }
        };
        window.Test = {searchPanel:1, searchPanelLoaded: false};
        view.setScripts([{Name:"OnValueChanged", Body:"window.Test.searchPanel = 5"}, {Name:"OnLoaded", Body:"window.Test.searchPanelLoaded = true"}]);

        //When
        var build = searchPanel.build(searchPanel, view, metadata);
        var $button = $(build.render());
        $button.find('.btn_search').click();

        // Then
        assert.equal(window.Test.searchPanel, 5);
        assert.isTrue(window.Test.searchPanelLoaded);
    });
});