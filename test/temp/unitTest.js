describe('DocumentDataSource', function () {
    var builder = new ApplicationBuilder(),
        metadata = {
            Name: 'PatientDataSource',
            ConfigId: 'Demography',
            DocumentId: 'Patient',
            IdProperty: 'Id',
            CreateAction: 'CreateDocument',
            GetAction: 'GetDocument',
            UpdateAction: 'SetDocument',
            DeleteAction: 'DeleteDocument',
            FillCreatedItem: true
            //PageNumber: 10,
            //PageSize: 50
        },
        parentView = fakeView();

    describe('dataSource CRUD operations', function () {
        it('should get list of data', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);
            //dataSource.setListMode();

            var invokes = false;

            dataSource.getItems(function (data) {
                invokes = true;
                assert.isTrue(data.length > 0, "data provider returns items");
            });

            assert.isTrue(invokes, "data provider has been invoked");
        });
    });

});