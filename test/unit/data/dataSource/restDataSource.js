describe('ObjectDataSource', function () {
    window.providerRegister.register('RestDataSource', FakeRestDataProvider);

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

    function createRestDataSource(){

        var view = fakeView();
        var dataSource = new RestDataSource({ view: view }),
            newItems = JSON.parse(JSON.stringify(items));

        FakeRestDataProvider.prototype.items = newItems;

        return dataSource;
    }

    describe('RestDataSource base api', function () {

        it('should get list of data', function (done) {
            // Given


            var dataSource = createRestDataSource();

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

        it('should get document property', function (done) {
            // Given
            var dataSource = createRestDataSource();

            //When
            dataSource.updateItems(handleItemsReady);

            function handleItemsReady(){
                // Then
                assert.equal(dataSource.getProperty('FirstName'), 'Иван', 'return property value by simple property');
                assert.equal(dataSource.getProperty('$.FirstName'), 'Иван', 'return property value by relative property');
                assert.equal(dataSource.getProperty('$').FirstName, 'Иван', 'return property - full item by $ selector');
                assert.equal(dataSource.getProperty('2.FirstName'), 'Иван1', 'return property - full item by index selector');
                assert.equal(dataSource.getProperty('.selectedItem.Id'), 1, 'return right spec property');
                done();
            }
        });

        it('should change document property', function (done) {
            // Given
            var dataSource = createRestDataSource();
            var item3;


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'),'Иван', 'return property value by property');
                assert.equal(dataSource.getProperty('.selectedItem.Id'), 1, 'return property value by property 2');
                item3 = dataSource.getProperty('3');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.setProperty('$.LastName', 'Ивнв');
                dataSource.setProperty('2.FirstName', 'Иванидзе-дзе');
                dataSource.setProperty('3', {
                    "Id": '55',
                    "FirstName": "П2",
                    "LastName": "Пе2"
                });
                dataSource.setProperty('3.FirstName', 'П22');

                // Then
                assert.equal(dataSource.getProperty('$').FirstName, 'Иванидзе', 'return property value by property after change property');
                assert.equal(dataSource.getProperty('LastName'), 'Ивнв', 'return property value by property after change property 2');
                assert.equal(dataSource.getProperty('2').FirstName, 'Иванидзе-дзе', 'return property value by property after change property by id');
                assert.equal(dataSource.getProperty('3'), item3, 'on set full item, link on item is not changed');
                assert.equal(dataSource.getProperty('3.FirstName'), item3.FirstName, 'return property value by property after change property 3');
                assert.equal(dataSource.getProperty('3.Id'), item3.Id, 'return property value by property after change property 4');
                done();
            }
        });

        it('should change spec value as property', function (done) {
            // Given
            var dataSource = createRestDataSource();
            var item3;


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.equal(dataSource.getProperty('FirstName'),'Иван', 'return property value by property');
                assert.equal(dataSource.getProperty('.selectedItem.Id'), 1, 'return property value by property 2');
                item3 = dataSource.getProperty('3');

                //When
                dataSource.setProperty('.selectedItem', {'a':3});

                // Then
                assert.equal(dataSource.getProperty('.selectedItem.a'), 3, 'return property value by property after change property 5');
                done();
            }
        });

        it('should property changed', function (done) {
            // Given
            var dataSource = createRestDataSource();
            var result = '';


            function subscribeOnPropertyChanged(){
                dataSource.onPropertyChanged('0.FirstName', function(context, args){
                    result += '1';

                    assert.equal(args.oldValue, 'Иван', 'right old value in args');
                    assert.equal(args.newValue, 'Иванидзе', 'right new value in args');
                    assert.equal(dataSource.getProperty('FirstName'), 'Иванидзе', 'value in source is new, when onPropertyChanged called');
                });

                dataSource.onPropertyChanged('0.LastName', function(context, args){
                    result += '2';

                    assert.equal(args.oldValue, 'Иванов', 'right old value in args');
                    assert.equal(args.newValue, 'Ивнв', 'right new value in args');
                    assert.equal(dataSource.getProperty('LastName'), 'Ивнв', 'value in source is new, when onPropertyChanged called');
                });

                dataSource.onPropertyChanged('.selectedItem', function(context, args){
                    result += '3';

                    assert.equal(args.oldValue.FirstName, 'Иванидзе', 'right old value in args');
                    assert.equal(args.newValue.a, 3, 'right new value in args');
                    assert.equal(dataSource.getSelectedItem().a, 3, 'value in source is new, when onPropertyChanged called');
                });
            }


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                subscribeOnPropertyChanged();

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.setProperty('$.LastName', 'Ивнв');
                dataSource.setProperty('2.FirstName', 'Иванидзе-дзе');
                dataSource.setProperty('3', {
                    "Id": '55',
                    "FirstName": "П2",
                    "LastName": "Пе2"
                });
                dataSource.setProperty('3.FirstName', 'П22');

                dataSource.setProperty('.selectedItem', {'a':3});

                // Then
                assert.equal(result, '123', 'all handlers called in correct order');
                done();
            }
        });

    });
});