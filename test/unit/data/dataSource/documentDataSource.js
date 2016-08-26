describe('DocumentDataSource', function () {
    window.InfinniUI.providerRegister.register('DocumentDataSource', FakeRestDataProvider);

    var dataItems = [
        {
            "_id": '1',
            "FirstName": "Иван",
            "LastName": "Иванов"
        },
        {
            "_id": '2',
            "FirstName": "Петр",
            "LastName": "Петров"
        },
        {
            "_id": '3',
            "FirstName": "Иван1",
            "LastName": "Иванов1"
        },
        {
            "_id": '4',
            "FirstName": "Петр2",
            "LastName": "Петров2"
        },
        {
            "_id": '5',
            "FirstName": "Иван3",
            "LastName": "Иванов3"
        },
        {
            "_id": '6',
            "FirstName": "Петр4",
            "LastName": "Петров5"
        },
        {
            "_id": '10',
            "FirstName": "Анна",
            "LastName": "Сергеева"

        }
    ];

    describe('DocumentDataSource base api', function () {
        it('should get list of data', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            assert.isFalse(dataSource.isDataReady(), 'dataReady status is right (false)');
            assert.isFalse(dataSource.get('isRequestInProcess'), 'is request not in process');

            //When
            dataSource.updateItems(
                function(context, args){

                    // Then
                    assert.isTrue(args.value.length > 0, 'data provider returns items');
                    assert.isTrue(dataSource.getItems().length > 0, 'data source have items');
                    assert.isTrue(dataSource.isDataReady(), 'dataReady status is right (true)');
                    done();

                }
            );
        });

        it('should return default list of data', function (done) {
            // Given
            var builder = new InfinniUI.ApplicationBuilder();
            var defaultItems = [{"Id": "0000"}];
            var metadata = {
                "DefaultItems": defaultItems
            };

            // When
            var documentDataSource = builder.buildType('DocumentDataSource', metadata, {parentView: fakeView()});

            // Then
            var items = documentDataSource.getItems();
            assert.equal(items, defaultItems);
            done();
        });

        it('should subscribe to property of selectedItem', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var result = '';

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            dataSource.onPropertyChanged('$.FirstName', function(context, args){
                result += ', ' + args.newValue;
            });

            dataSource.updateItems(
                function(context, args){

                    //When
                    dataSource.setProperty('$.FirstName', 'Иванов 2');
                    dataSource.setProperty('0.FirstName', 'Иванов 3');
                    dataSource.setProperty('3.FirstName', 'Иванов 4');
                    dataSource.setSelectedItem(dataSource.getItems()[1]);
                    dataSource.setProperty('0.FirstName', 'Иванов 5');
                    dataSource.setProperty('1.FirstName', 'Иванов 6');

                    // Then
                    assert.equal(result, ', Иван, Иванов 2, Иванов 3, Иванов 6', 'onPropertyChanged called in right order');
                    done();

                }
            );
        });

/* TODO раскомментировать после фильтрации фейковых провайдеров
        it('should get editing record', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeRestDataProvider);
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var builder = new InfinniUI.ApplicationBuilder();
            var view = fakeView();
            var dataSource = builder.buildType('DocumentDataSource', {}, {parent: view, parentView: view, builder: builder});

            //When
            dataSource.suspendUpdate();
            dataSource.setIdFilter('1');
            dataSource.resumeUpdate();



            var items = dataSource.updateItems(
                function (context, args) {

                    // Then
                    assert.lengthOf(args.value, 1, 'length of filtered items set');
                    assert.equal(args.value[0].Id, '1', 'value of filtered items set');

                    done();
                }
            );
        });


        it('should update document', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeRestDataProvider);
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();

            //When
            dataSource.updateItems(
                function(context, args){

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
        });*/

        it('should restore selected item after updating', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(
                function(){
                    var items = dataSource.getItems();
                    var selectedItem = items[3];
                    dataSource.setSelectedItem(selectedItem);

                    //When
                    dataSource.updateItems(
                        function(context, args){
                            //Then
                            assert.equal(dataSource.getSelectedItem(), selectedItem);
                            done();
                        }
                    );
                }
            );
        });

        it('should create document', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.createItem(
                function(context, argument){

                    // Then
                    var newItem = argument.value;
                    assert.ok(newItem, 'new item is ready');

                    var items = dataSource.getItems();
                    assert.lengthOf(items, 1, 'one element (when was created) in items');
                    //assert.equal(items[0].prefilledField, 1, 'is right element in items after creating');
                    done();
                }
            );
        });

        it('should get document property', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            //When
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');
                assert.equal(dataSource.getProperty('$.FirstName'), 'Иван', 'return property value by relative property');
                assert.equal(dataSource.getProperty('$').FirstName, 'Иван', 'return property - full item by $ selector');
                assert.equal(dataSource.getProperty('2.FirstName'), 'Иван1', 'return property - full item by index selector');
                done();
            }
        });

        it('should select item', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
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
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'),'Иван', 'return property value by property');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.setProperty('2.FirstName', 'Иванидзе-дзе');

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Иванидзе', 'return property value by property after change property');
                assert.equal(dataSource.getProperty('2').FirstName, 'Иванидзе-дзе', 'return property value by property after change property by id');
                done();
            }
        });

        it('should change document property (full item change)', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by property');

                //When
                var newItemData = {
                    "_id": '1',
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
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
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
                assert.isTrue(validateResult1.IsValid, 'successfully validation');

                assert.isFalse(validateResult2.IsValid, 'fail validation');
                assert.lengthOf(validateResult2.Items, 1, 'fail validation results');
                assert.equal(validateResult2.Items[0].property, 'FirstName', 'fail validation property result');

                assert.isFalse(validateResult3.IsValid, 'full validation');
                assert.lengthOf(validateResult3.Items, 6, 'full validation results');
                assert.equal(validateResult3.Items[3].property, '4.FirstName', 'full validation property result');
                done();
            }

            function validator(context, argument){
                var result = {
                    IsValid: true
                };

                if(argument.FirstName != 'Иван'){
                    result.IsValid = false;
                    result.Items = [{
                        property: 'FirstName',
                        message: 'Почему не Иван?!'
                    }];
                }

                return result;
            }
        });

        it('should save item', function (done) {
            // Given
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
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
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
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

       /* TODO раскомментировать после фильтрации фейковых провайдеров
        it('should add items', function (done) {

            // Given
            window.providerRegister.register('DocumentDataSource', FakeRestDataProvider);
            FakeRestDataProvider.prototype.items = JSON.parse(JSON.stringify(dataItems));

            var dataSource = new InfinniUI.DocumentDataSource({
                view: fakeView()
            });

            dataSource.suspendUpdate();
            dataSource.setPageSize(5);
            dataSource.resumeUpdate();


            dataSource.updateItems(
                function(context, args){

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
        });*/
    });
});
