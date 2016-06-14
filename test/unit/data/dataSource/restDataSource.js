describe('RestDataSource', function () {
    window.InfinniUI.providerRegister.register('RestDataSource', FakeRestDataProvider);

    var items = [
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

    function createRestDataSource(missParam){

        var view = fakeView();
        var dataSource = new RestDataSource({ view: view }),
            newItems = JSON.parse(JSON.stringify(items));

        dataSource.suspendUpdate('urlTuning');
        dataSource.setNewItemsHandler(function(newItemsData){
            if(newItemsData){
                return newItemsData['Result']['Items'];

            }else{
                return newItemsData;

            }
        });

        /*
        * кейсы использования фильтров
        *
        * удобно ли будет биндить автокомплит комбобокса на ДС вручную?
        *
        * DS{
        *     Autocomplete: true,
        *     AutocompleteValue: {
        *         Source: "SomeDocDS",
        *         Property: ".filter",
        *         Direction: "ToSource",
        *         Converters: {
        *             ToSource: "{return 'eq(' + args.value + ')';}"
        *         }
        *     }
        * }
        * */

        dataSource.setGettingUrlParams({
            type: 'get',
            origin:'http://some.ru',
            path:'/some/id<%param1%><%param2%>?a=2&b=<%param1%><%param3%>',
            data: {},

            params: {
                param1: 4,
                param2: missParam ? undefined : '/',
                param3: '&c=4'
            }
        });

        dataSource.setSettingUrlParams({
            type: 'post',
            origin:'http://some.ru',
            path:'/some/<%param1%>/<%param2%>',
            data: {
                a:2,
                b: '<%param1%>',
                c: '!1<%param2%>2!'
            },

            params: {
                param1: '',
                param2: ''
            }
        });

        dataSource.setDeletingUrlParams({
            type: 'delete',
            origin:'http://some.ru',
            path:'/some/<%param1%>/<%param2%>',
            data: {
                a:2,
                b: '<%param1%>',
                c: '!1<%param2%>2!'
            },

            params: {
                param1: '',
                param2: ''
            }
        });

        dataSource.resumeUpdate('urlTuning');

        FakeRestDataProvider.prototype.items = newItems;
        FakeRestDataProvider.prototype.lastSendedUrl = '';

        return dataSource;
    }

    describe('RestDataSourceBuilder', function () {

        it('successful build', function () {
            // Given
            var builder = new ApplicationBuilder();
            var metadata = {
                GettingParams: {
                    Method: 'get',
                    Origin: 'http://some.ru',
                    Path: '/some/id<%param1%>',
                    Data: {
                        a: 'param1=<%param1%>'
                    },

                    Params: {
                        param1: 4
                    }
                }
            };

            // When
            var restDataSource = builder.buildType('RestDataSource', metadata, {parentView: fakeView()});

            // Then
            var gettingParams = restDataSource.getGettingUrlParams();

            assert.equal(gettingParams.method, 'get');
            assert.equal(gettingParams.origin, 'http://some.ru');
            assert.equal(gettingParams.path, '/some/id<%param1%>');
            assert.deepEqual(gettingParams.data, {a: 'param1=<%param1%>'});
            assert.deepEqual(gettingParams.params, {param1: 4});
        });

    });

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
                assert.equal(dataSource.getProperty('.selectedItem._id'), 1, 'return right spec property');
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
                assert.equal(dataSource.getProperty('.selectedItem._id'), 1, 'return property value by property 2');
                item3 = dataSource.getProperty('3');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.setProperty('$.LastName', 'Ивнв');
                dataSource.setProperty('2.FirstName', 'Иванидзе-дзе');
                dataSource.setProperty('3', {
                    "_id": '55',
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
                assert.equal(dataSource.getProperty('3._id'), item3._id, 'return property value by property after change property 4');
                done();
            }
        });

        it('should add changing items in modified set', function (done) {
            // Given
            var dataSource = createRestDataSource();
            var item;


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                assert.isFalse(dataSource.isModified(), 'at first items is not modified');

                //When
                dataSource.setProperty('FirstName', 'Иванидзе');
                dataSource.setProperty('$.LastName', 'Ивнв');
                dataSource.setProperty('2.FirstName', 'Иванидзе-дзе');
                dataSource.setProperty('3.FirstName', 'Petrov');
                dataSource.setProperty('3', {
                    "_id": '55',
                    "FirstName": "П2",
                    "LastName": "Пе2"
                });
                dataSource.setProperty('4', {
                    "_id": '5',
                    "FirstName": "П5",
                    "LastName": "Пе5"
                });

                // Then
                assert.equal(_.size(dataSource.get('modifiedItems')), 4, 'length of modified items');
                item = dataSource.getProperty('0');
                assert.isTrue(dataSource.isModified(item), 'is modified 1');
                item = dataSource.getProperty('2');
                assert.isTrue(dataSource.isModified(item), 'is modified 2');
                item = dataSource.getProperty('3');
                assert.isTrue(dataSource.isModified(item), 'is modified 3');
                item = dataSource.getProperty('4');
                assert.isTrue(dataSource.isModified(item), 'is modified 4');

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
                assert.equal(dataSource.getProperty('.selectedItem._id'), 1, 'return property value by property 2');
                item3 = dataSource.getProperty('3');

                //When
                dataSource.setProperty('.selectedItem', {'a':3});

                // Then
                assert.equal(dataSource.getProperty('.selectedItem.a'), 3, 'return property value by property after change property 5');
                done();
            }
        });

        it('should handle property changed', function (done) {
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
                    "_id": '55',
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

        it('should handle selectedItem changed', function (done) {
            // Given
            var dataSource = createRestDataSource();
            var result = '';
            var item;


            dataSource.onSelectedItemChanged(function(context, args){
                result += '1';

                //assert.isTrue(!args.oldValue || args.oldValue.FirstName ==  'Иван', 'right old value in args');
                assert.isTrue(args.value.FirstName ==  'Иван' || args.value.FirstName == 'Петр', 'right new value in args');
            });


            dataSource.updateItems(handleItemsReady);


            function handleItemsReady(){
                item = dataSource.getItems()[1];

                //When
                dataSource.setSelectedItem(item);

                // Then
                assert.equal(result, '11', 'all handlers called in correct order');
                done();
            }
        });

        it('should handle url params changing', function (done) {
            // Given
            var dataSource = createRestDataSource(true);
            var item;

            assert.equal(FakeRestDataProvider.prototype.lastSendedUrl, '', 'request was not sended');

            dataSource.updateItems(handleItemsReady);

            dataSource.setGettingUrlParams('params.param2', '/newVal/');

            function handleItemsReady(){
                // Then
                assert.equal(FakeRestDataProvider.prototype.lastSendedUrl, 'http://some.ru/some/id4/newVal/?a=2&b=4&c=4', 'request sended on right url');

                done();
            }
        });

    });
});