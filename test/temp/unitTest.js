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
            assert.isFalse(dataSource.get('isRequestInProcess'), 'is request not in process');

            //When
            dataSource.updateItems(
                function(context, arguments){

                    // Then
                    assert.isTrue(arguments.value.length > 0, 'data provider returns items');
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
                function (context, arguments) {

                    // Then
                    assert.equal(arguments.value.length, 1);
                    assert.equal(arguments.value[0].Id, '1');

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

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();

            //When
            dataSource.updateItems(
                function(context, arguments){

                    assert.isTrue(dataSource.getItems().length == 5, 'data provider returns 5 items');

                    dataSource.suspendUpdate();
                    dataSource.setPageNumber(1);
                    dataSource.resumeUpdate();
                    dataSource.updateItems(
                        function(data){

                            // Then
                            assert.isTrue(dataSource.getItems().length == 2, 'data provider returns 2 items');
                            done();

                        }
                    );

                }
            );
         });

        it('should create document', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.createItem(
                function(context, argument){

                    // Then
                    var newItem = argument.value;
                    assert.ok(newItem, 'new item is ready');
                    assert.isTrue(newItem.prefilledField == 1, 'prefilled field is right');
                    assert.isTrue(newItem.__Id == newItem.Id, 'special Id is right');
                    done();
                }
            );
        });

        it('should get document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                // Then
                assert.isTrue(dataSource.getProperty('FirstName') == 'Иван', 'return property value by simple property');
                assert.isTrue(dataSource.getProperty('$.FirstName') == 'Иван', 'return property value by relative property');
                assert.isTrue(dataSource.getProperty('$').FirstName == 'Иван', 'return property - full item by $ selector');
                done();
            }
        });

        it('should select item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                var items = dataSource.getItems();
                assert.isTrue(dataSource.getProperty('FirstName') == 'Иван', 'return property value by simple property');

                //When
                dataSource.setSelectedItem(items[1]);

                // Then
                assert.isTrue(dataSource.getProperty('FirstName') == 'Петр', 'return property value by simple property after change selected item');
                done();
            }
        });

        it('should change document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.isTrue(dataSource.getProperty('FirstName') == 'Иван', 'return property value by property');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');

                // Then
                assert.isTrue(dataSource.getProperty('$').FirstName == 'Иванидзе', 'return property value by property after change property');
                done();
            }
        });

        it('should change document property (full item change)', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                assert.isTrue(dataSource.getProperty('FirstName') == 'Иван', 'return property value by property');

                //When
                var newItemData = {
                    "Id": '1',
                    "FirstName": "Ивано",
                    "LastName": "Иванович"
                };
                dataSource.setProperty('$', newItemData);

                // Then
                assert.isTrue(dataSource.getProperty('$').FirstName == 'Ивано', 'return property value by property after change property');
                done();
            }
        });
    });

});