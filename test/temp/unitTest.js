describe('DocumentDataSource', function () {

    describe('DocumentDataSource base api', function () {
        it('should get list of data', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

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
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);


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
                    assert.lengthOf(arguments.value, 1, 'length of filtered items set');
                    assert.equal(arguments.value[0].Id, '1', 'value of filtered items set');

                    done();
                }
            );
        });


        it('should update document', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();

            //When
            dataSource.updateItems(
                function(context, arguments){

                    assert.lengthOf(dataSource.getItems(), 5, 'data provider returns 5 items');

                    dataSource.suspendUpdate();
                    dataSource.setPageNumber(1);
                    dataSource.resumeUpdate();
                    dataSource.updateItems(
                        function(data){

                            // Then
                            assert.lengthOf(dataSource.getItems(), 2, 'data provider returns 2 items');
                            done();

                        }
                    );

                }
            );
         });

        it('should create document', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.createItem(
                function(context, argument){

                    // Then
                    var newItem = argument.value;
                    assert.ok(newItem, 'new item is ready');
                    assert.equal(newItem.prefilledField, 1, 'prefilled field is right');
                    assert.equal(newItem.__Id, newItem.Id, 'special Id is right');
                    done();
                }
            );
        });

        it('should get document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');
                assert.equal(dataSource.getProperty('$.FirstName'), 'Иван', 'return property value by relative property');
                assert.equal(dataSource.getProperty('$').FirstName, 'Иван', 'return property - full item by $ selector');
                done();
            }
        });

        it('should select item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                var items = dataSource.getItems();
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');

                //When
                dataSource.setSelectedItem(items[1]);

                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Петр', 'return property value by simple property after change selected item');
                done();
            }
        });

        it('should change document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'),'Иван', 'return property value by property');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Иванидзе', 'return property value by property after change property');
                done();
            }
        });

        it('should change document property (full item change)', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by property');

                //When
                var newItemData = {
                    "Id": '1',
                    "FirstName": "Ивано",
                    "LastName": "Иванович"
                };
                dataSource.setProperty('$', newItemData);

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Ивано', 'return property value by property after change property');
                done();
            }
        });

        it('should validate item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.setErrorValidator(validator);
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){

                //When
                var items = dataSource.getItems(),
                    validateResult1 = dataSource.validateOnErrors(items[0]),
                    validateResult2 = dataSource.validateOnErrors(items[1]),
                    validateResult3 = dataSource.validateOnErrors();

                // Then
                assert.isTrue(validateResult1.isValid, 'successfully validation');

                assert.isFalse(validateResult2.isValid, 'fail validation');
                assert.lengthOf(validateResult2.items, 1, 'fail validation results');
                assert.equal(validateResult2.items[0].property, 'FirstName', 'fail validation property result');

                assert.isFalse(validateResult3.isValid, 'full validation');
                assert.lengthOf(validateResult3.items, 6, 'full validation results');
                assert.equal(validateResult3.items[3].property, '4.FirstName', 'full validation property result');
                done();
            }

            function validator(context, argument){
                var result = {
                    isValid: true
                };

                if(argument.FirstName != 'Иван'){
                    result.isValid = false;
                    result.items = [{
                        property: 'FirstName',
                        message: 'Почему не Иван?!'
                    }];
                }

                return result;
            }
        });

        it('should save item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady1);

            function handleItemsReady1(){

                //When
                var item = dataSource.getSelectedItem();

                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.saveItem(item);

                dataSource.updateItems(handleItemsReady2);
            }

            function handleItemsReady2(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иванидзе', 'item is saved');
                done();
            }
        });

        it('should delete item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady1);

            function handleItemsReady1(){

                //When
                var items = dataSource.getItems(),
                    itemsCount = items.length;

                dataSource.deleteItem(items[0], function(context, argument){
                    // Then
                    items = dataSource.getItems();
                    assert.lengthOf(items, itemsCount-1, 'items length is decrease');
                    assert.equal(dataSource.getSelectedItem(), null, 'deleted item exclude from selected item');
                    done();
                });
            }
        });

        it('should add items', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();


            dataSource.updateItems(
                function(context, arguments){

                    assert.lengthOf(dataSource.getItems(), 5, 'datasource have 5 items');
                    assert.equal(dataSource.getPageNumber(), 0, 'datasource at first page');

                    //When
                    dataSource.addNextItems(
                        function(data){

                            // Then
                            assert.lengthOf(dataSource.getItems(), 7, 'after adding datasource have 7 items');
                            assert.equal(dataSource.getPageSize(), 5, 'after adding datasource still have page size equal 5');
                            assert.equal(dataSource.getPageNumber(), 1, 'after adding datasource at second page');
                            done();

                        }
                    );

                }
            );
        });
    });
});




describe('ObjectDataSource', function () {
    var items = [
        {
            "Id": '1',
            "FirstName": "Иван",
            "LastName": "Иванов"
        },
        {
            "Id": '2',
            "FirstName": "Петр",
            "LastName": "Петров"
        },
        {
            "Id": '3',
            "FirstName": "Иван1",
            "LastName": "Иванов1"
        },
        {
            "Id": '4',
            "FirstName": "Петр2",
            "LastName": "Петров2"
        },
        {
            "Id": '5',
            "FirstName": "Иван3",
            "LastName": "Иванов3"
        },
        {
            "Id": '6',
            "FirstName": "Петр4",
            "LastName": "Петров5"
        },
        {
            "Id": '10',
            "FirstName": "Анна",
            "LastName": "Сергеева"

        }
    ];

    window.providerRegister.register('ObjectDataSource', ObjectDataProvider);

    function createObjectDataSource(){
        var dataSource = new ObjectDataSource({
            view: fakeView()
        });

        dataSource.setItems(items);

        return dataSource;
    }

    describe('ObjectDataSource base api', function () {
        it('should get list of data', function (done) {
            // Given
            var dataSource = createObjectDataSource();

            assert.isFalse(dataSource.isDataReady(), 'dataReady status is right (false)');

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

        it('should create document', function (done) {
            // Given
            var dataSource = createObjectDataSource();

            //When
            dataSource.createItem(
                function(context, argument){

                    // Then
                    var newItem = argument.value;
                    assert.ok(newItem, 'new item is ready');
                    assert.equal(newItem.prefilledField, 1, 'prefilled field is right');
                    assert.equal(newItem.__Id, newItem.Id, 'special Id is right');
                    done();
                }
            );
        });

        it('should get document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');
                assert.equal(dataSource.getProperty('$.FirstName'), 'Иван', 'return property value by relative property');
                assert.equal(dataSource.getProperty('$').FirstName, 'Иван', 'return property - full item by $ selector');
                done();
            }
        });

        it('should select item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                var items = dataSource.getItems();
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');

                //When
                dataSource.setSelectedItem(items[1]);

                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Петр', 'return property value by simple property after change selected item');
                done();
            }
        });

        it('should change document property', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'),'Иван', 'return property value by property');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Иванидзе', 'return property value by property after change property');
                done();
            }
        });

        it('should change document property (full item change)', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by property');

                //When
                var newItemData = {
                    "Id": '1',
                    "FirstName": "Ивано",
                    "LastName": "Иванович"
                };
                dataSource.setProperty('$', newItemData);

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Ивано', 'return property value by property after change property');
                done();
            }
        });

        it('should validate item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.setErrorValidator(validator);
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){

                //When
                var items = dataSource.getItems(),
                    validateResult1 = dataSource.validateOnErrors(items[0]),
                    validateResult2 = dataSource.validateOnErrors(items[1]),
                    validateResult3 = dataSource.validateOnErrors();

                // Then
                assert.isTrue(validateResult1.isValid, 'successfully validation');

                assert.isFalse(validateResult2.isValid, 'fail validation');
                assert.lengthOf(validateResult2.items, 1, 'fail validation results');
                assert.equal(validateResult2.items[0].property, 'FirstName', 'fail validation property result');

                assert.isFalse(validateResult3.isValid, 'full validation');
                assert.lengthOf(validateResult3.items, 6, 'full validation results');
                assert.equal(validateResult3.items[3].property, '4.FirstName', 'full validation property result');
                done();
            }

            function validator(context, argument){
                var result = {
                    isValid: true
                };

                if(argument.FirstName != 'Иван'){
                    result.isValid = false;
                    result.items = [{
                        property: 'FirstName',
                        message: 'Почему не Иван?!'
                    }];
                }

                return result;
            }
        });

        it('should save item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady1);

            function handleItemsReady1(){

                //When
                var item = dataSource.getSelectedItem();

                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.saveItem(item);

                dataSource.updateItems(handleItemsReady2);
            }

            function handleItemsReady2(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иванидзе', 'item is saved');
                done();
            }
        });

        it('should delete item', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady1);

            function handleItemsReady1(){

                //When
                var items = dataSource.getItems(),
                    itemsCount = items.length;

                dataSource.deleteItem(items[0], function(context, argument){
                    // Then
                    items = dataSource.getItems();
                    assert.lengthOf(items, itemsCount-1, 'items length is decrease');
                    assert.equal(dataSource.getSelectedItem(), null, 'deleted item exclude from selected item');
                    done();
                });
            }
        });

        it('should add items', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeDataProvider);

            var dataSource = new DocumentDataSource({
                view: fakeView()
            });

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();


            dataSource.updateItems(
                function(context, arguments){

                    assert.lengthOf(dataSource.getItems(), 5, 'datasource have 5 items');
                    assert.equal(dataSource.getPageNumber(), 0, 'datasource at first page');

                    //When
                    dataSource.addNextItems(
                        function(data){

                            // Then
                            assert.lengthOf(dataSource.getItems(), 7, 'after adding datasource have 7 items');
                            assert.equal(dataSource.getPageSize(), 5, 'after adding datasource still have page size equal 5');
                            assert.equal(dataSource.getPageNumber(), 1, 'after adding datasource at second page');
                            done();

                        }
                    );

                }
            );
        });
    });

});