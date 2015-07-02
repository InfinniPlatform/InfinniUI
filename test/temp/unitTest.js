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
        it('should get list of data', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            assert.isFalse(dataSource.isDataReady());

            //When
            dataSource.updateItems(function(data){

                // Then
                assert.isTrue(data.length > 0, "data provider returns items");
                done();

            });

            var invokes = false;

            dataSource.getItems(function (data) {
                invokes = true;
                assert.isTrue(data.length > 0, "data provider returns items");
            });

            assert.isTrue(invokes, "data provider has been invoked");
        });
    });

});