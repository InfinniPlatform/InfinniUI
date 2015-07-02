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

            assert.isFalse(dataSource.isDataReady(), 'dataReady status is right (false)');

            //When
            dataSource.updateItems(function(data){

                // Then
                assert.isTrue(data.length > 0, 'data provider returns items');
                assert.isTrue(dataSource.getItems().length > 0, 'data source have items');
                assert.isTrue(dataSource.isDataReady(), 'dataReady status is right (true)');
                done();

            });
        });
    });

});