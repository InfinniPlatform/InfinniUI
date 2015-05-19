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
        view.setGuid(guid());
        var metadata = {
            Name: "SearchPanel1",
            DataSource: "PatientsDataSource"
        };
        var exchange = view.getExchange();

        var searchPanel = searchPanelBuilder.build(builder, view, metadata);
        var $searchPanel = searchPanel.render();
        exchange.subscribe(messageTypes.onSetTextFilter, onSetTextFilterHandler);

        // When
        searchPanel.setValue(123);
        // вместо нативного вызова поиска, имитируем его, поскольку иначе мокка редиректит страницу, цука.
        searchPanel.control.controlView.submitFormHandler({
            preventDefault: $.noop
        });

        // Then
        function onSetTextFilterHandler(messageBody){
            assert.equal(messageBody.value, 123);
            assert.equal(messageBody.dataSource, 'PatientsDataSource');
            done();
        }
    });

    it('should be true if scriptsHandlers call', function () {
        //Given
        var searchPanelBuilder = new SearchPanelBuilder();
        var view = new View();
        view.setGuid(guid());
        var metadata = {
            OnValueChanged:{
                Name: 'OnValueChanged'
            },
            OnLoaded:{
                Name: 'OnLoaded'
            }
        };
        window.Test2 = {searchPanel:1, searchPanelLoaded: false};
        view.setScripts([{Name:"OnValueChanged", Body:"window.Test2.searchPanel = 5"}, {Name:"OnLoaded", Body:"window.Test2.searchPanelLoaded = true"}]);
        var searchPanel = searchPanelBuilder.build(searchPanelBuilder, view, metadata);

        //When
        searchPanel.render();
        // вместо нативного вызова поиска, имитируем его, поскольку иначе мокка редиректит страницу, цука.
        searchPanel.control.controlView.submitFormHandler({
            preventDefault: $.noop
        });

        // Then
        assert.equal(window.Test2.searchPanel, 5);
        assert.isTrue(window.Test2.searchPanelLoaded);
    });
});