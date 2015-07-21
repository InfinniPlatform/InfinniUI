describe('PropertyBinding', function () {

    var dataSource = {
        Name: 'PatientDataSource',
        ConfigId: 'Demography',
        DocumentId: 'Patient',
        IdProperty: 'Id'
    };

    var property = 'LastName',
        view = fakeView({
            getDataSource: function (value) {
                for (var i = 0; i < dataSources.length; i++) {
                    if (dataSources[i].getName() == value) {
                        return dataSources[i];
                    }
                }
                return null;
            }
        }),
        builder = new ApplicationBuilder(),
        dataSourceBuilder = new DocumentDataSourceBuilder(),
        patientMetadata = {
            Name: 'PatientDataSource',
            ConfigId: 'Demography',
            DocumentId: 'Patient',
            IdProperty: 'Id'
        },
        dataSourcePatient = dataSourceBuilder.build(null, {builder: builder, parent: view, metadata: patientMetadata}),
        medicalWorkerMetadata = {
            Name: 'MedicalWorkerDataSource',
            ConfigId: 'Structure',
            DocumentId: 'MedicalWorker',
            IdProperty: 'Id'
        },
        dataSourceMedicalWorker = dataSourceBuilder.build(null, {builder: builder, parent: view, metadata: medicalWorkerMetadata}),
        dataSources = [dataSourcePatient, dataSourceMedicalWorker];

    it('should build property binding', function () {

        var propertyBinding = {
            Name: "PatientBinding",
            DataSource: 'PatientDataSource',
            Property: 'LastName'
        };

        var dataSources = [dataSourcePatient, dataSourceMedicalWorker];

        var propertyBindingBuilder = new PropertyBindingBuilder();

        propertyBindingBuilder.build(builder, view, propertyBinding);

        assert.equal(dataSources[0].getDataBindings().length, 1);
        //check that dataSource binding was added
        assert.equal(dataSources[0].getDataBindings()[0].getDataSource(), dataSources[0].getName());
    });


    it('should get baseDataBinding properties', function () {
        var dataBinding = new PropertyBinding(view, dataSource, property);

        assert.equal(dataBinding.getProperty(), property);
        assert.equal(dataBinding.getDataSource(), dataSource);
        assert.equal(dataBinding.getView(), view);

    });

});