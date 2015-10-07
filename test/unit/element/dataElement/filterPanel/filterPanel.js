describe('FilterPanel', function () {
    it('should setting with default properties', function () {
        // Given
        var filterPanelBuilder = new FilterPanelBuilder();
        var builder = new Builder();
        var view = new View();
        var metadata = {
            Name: "FilterPanel1",
            DataSource: "PatientsDataSource"
        };
        var filterPanel = filterPanelBuilder.build(builder, view, metadata);

        //When
        filterPanel.setName('NewFilterPanel');
        filterPanel.setText('NewText');

        //Then
        assert.equal(filterPanel.getName(), 'NewFilterPanel');
        assert.isTrue(filterPanel.getEnabled());
        assert.equal(filterPanel.getHorizontalAlignment(), 'Stretch');
        assert.isTrue(filterPanel.getVisible());
        assert.equal(filterPanel.getText(), 'NewText');
    });

    it('should exchange (send, subscribe)', function (done) {
        // Given
        var builder = new ApplicationBuilder();
        var view = new View();
        view.setGuid(guid());
        var metadata = {
            FilterPanel: {
                Name: "FilterPanel1",
                DataSource: "PatientsDataSource",
                GeneralProperties: [
                    {
                        Text: "Имя",
                        Property: "FirstName",
                        DefaultOperator: "IsStartsWith",
                        Operators: [
                            {
                                Operator: "IsStartsWith",
                                Editor: {
                                    TextBox: {
                                        Name: "TextBox1",
                                        Value: {
                                            PropertyBinding: {
                                                DataSource: "PatientDataSource",
                                                Property: "FirstName"
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        };
        var exchange = view.getExchange();

        var filterPanel = builder.build(view, metadata);
        var $filterPanel = filterPanel.render();

        // When
        exchange.subscribe(messageTypes.onSetPropertyFilters, function (messageBody) {
            // Then
            assert.equal(messageBody.value[0].CriteriaType, 1024);//IsStartsWith = 1024
            assert.equal(messageBody.dataSource, 'PatientsDataSource');
            done();
        });
        $filterPanel.find('input')
            .val('qq')
            .trigger('change');
        // вместо нативного вызова поиска, имитируем его, поскольку иначе мокка редиректит страницу, цука.
        filterPanel.control.controlView.submitFormHandler({
            preventDefault: $.noop
        });
    });

    it('should be true if scriptsHandlers call', function () {
        //Given
        var filterPanelBuilder = new FilterPanelBuilder();
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
        window.Test = {filterPanel:1, filterPanelLoaded: false};
        view.setScripts([{Name:"OnValueChanged", Body:"window.Test.filterPanel = 5"}, {Name:"OnLoaded", Body:"window.Test.filterPanelLoaded = true"}]);

        //When
        var filterPanel = filterPanelBuilder.build(filterPanelBuilder, view, metadata);
        filterPanel.render();
        // вместо нативного вызова поиска, имитируем его, поскольку иначе мокка редиректит страницу, цука.
        filterPanel.control.controlView.submitFormHandler({
            preventDefault: $.noop
        });

        // Then
        assert.equal(window.Test.filterPanel, 5);
        assert.isTrue(window.Test.filterPanelLoaded);
    });
});