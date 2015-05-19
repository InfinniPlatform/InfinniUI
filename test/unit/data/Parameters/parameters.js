describe('Parameters', function () {

    /*it('should get/set value from datasource', function () {

        var provider = new FakeDataProvider();

        window.providerRegister.register('DocumentDataSource', function () {
            return provider;
        });

        var builder = new ApplicationBuilder();

        var view = fakeView();

        var metadata = {
            Name: 'PatientDataSource',
            ConfigId: 'Demography',
            DocumentId: 'Patient',
            IdProperty: 'Id',
            CreateAction: 'CreateDocument',
            GetAction: 'GetDocument',
            UpdateAction: 'SetDocument',
            DeleteAction: 'DeleteDocument',
            FillCreatedItem: true
        };


        var items = null;
        provider.getItems(null, 0, 10, null,  function (data) {
            items = data;
        });

        var dataSource = builder.buildType(view, 'DocumentDataSource', metadata);

        var dataBinding = new PropertyBinding(view, dataSource.getName(), '$.LastName');

        view.parameters = [];

        view.addParameter = function (parameter) {view.parameters.push(parameter);};
        view.getParameter = function () {return view.parameters[0];};
        view.getDataSource = function () {return dataSource;};

        var parameter = builder.buildType(view, 'Parameter', {
            Name: 'Patient',
            Value: {
                PropertyBinding: {
                    DataSource: 'PatientDataSource',
                    Property: '$'
                }
            }
        });

        var parameterBinding = builder.buildType(view, 'ParameterBinding', {
            Parameter: "Patient",
            Property: "LastName"
        });

        parameter.addDataBinding(parameterBinding);


        //dataSource.setEditMode();
        dataSource.resumeUpdate();
        dataSource.setSelectedItem(items[0]);
        parameter.addDataBinding(dataBinding);


        assert.isTrue(_.isEqual(items[0], parameter.getValue()));
        assert.equal(items[0].LastName, parameterBinding.getPropertyValue());
        parameterBinding.setPropertyValue('2014');
        assert.equal('2014', parameter.getValue().LastName);
    });*/

});