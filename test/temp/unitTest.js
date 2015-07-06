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
            assert.isFalse(dataSource.get('isRequestInProcess'), 'is request in process');

            //When
            dataSource.updateItems(
                function(data){

                    // Then
                    assert.isTrue(data.length > 0, 'data provider returns items');
                    assert.isTrue(dataSource.getItems().length > 0, 'data source have items');
                    assert.isTrue(dataSource.isDataReady(), 'dataReady status is right (true)');
                    done();

                }
            );
        });


        it('should get editing record', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource',
                function () {
                    return new FakeDataProvider();
                }
            );


            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.suspendUpdate();
            dataSource.setIdFilter('1');
            dataSource.resumeUpdate();



            var items = dataSource.updateItems(
                function (data) {

                    // Then
                    assert.equal(data.length, 1);
                    assert.equal(data[0].Id, '1');

                    done();
                }
            );
        });


        it('should update document', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            assert.isFalse(dataSource.isDataReady(), 'dataReady status is right (false)');

            //When
            dataSource.updateItems(
                function(data){

                    // Then
                    assert.isTrue(data.length > 0, 'data provider returns items');
                    assert.isTrue(dataSource.getItems().length > 0, 'data source have items');
                    assert.isTrue(dataSource.isDataReady(), 'dataReady status is right (true)');
                    done();

                }
            );
         });

        /*it('should create document', function (done) {

            window.providerRegister.register('DocumentDataSource', function (metadataValue) {
                return new DataProviderREST(metadataValue, new QueryConstructorStandard('http://ic:9900', metadataValue), null, errorCallback);
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            dataSource.setListMode();

            dataSource.onItemCreated(function (data) {
                assert.ok(data);
                done();
            });

            dataSource.createItem();
        });*/
    });

});