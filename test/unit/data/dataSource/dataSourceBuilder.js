describe('DataSourceBuilder', function () {

    var builder = new ApplicationBuilder();
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

    FakeRestDataProvider.prototype.items = items;

    window.providerRegister.register('DocumentDataSource', FakeRestDataProvider);

    describe('build DocumentDataSource', function () {
        it('should build documentDataSource', function () {
            // Given When
            var metadata = {
                    Name: 'PatientDataSource',
                    DocumentId: 'Patient',
                    FillCreatedItem: true,
                    PageNumber: 1,
                    PageSize: 5,

                    onPropertyChanged: {
                        Name: 'onPropertyChanged'
                    }
                };

            var view = new View(),
                createdDataSource = builder.buildType('DocumentDataSource', metadata, {parentView: view});

            // Then
            assert.equal(createdDataSource.getDocumentId(), 'Patient');
            assert.equal(createdDataSource.getIdProperty(), 'Id');
            assert.equal(createdDataSource.getPageSize(), 5, 'PageSize');
            assert.equal(createdDataSource.getPageNumber(), 1, 'PageNumber');
            assert.isTrue(createdDataSource.getFillCreatedItem(), 'Value of FillCreatedItem');
        });

        it('should subscribe documentDataSource on changeProperty', function (done) {
            // Given
            var metadata = {
                    Name: 'PatientDataSource',
                    DocumentId: 'Patient',
                    FillCreatedItem: true,
                    PageNumber: 1,
                    PageSize: 5,

                    OnPropertyChanged: {
                        Name: 'onPropertyChanged'
                    }
                };

            var view = new View(),
                createdDataSource = builder.buildType('DocumentDataSource', metadata, {parentView: view}),
                scriptMetadata = {
                    Name:"onPropertyChanged",
                    Body: 'window.documentDataSourceTest = 1;'
                };

            view.getScripts().add({
                name: 'onPropertyChanged',
                func: builder.buildType('Script', scriptMetadata, {parentView: view})
            });

            createdDataSource.updateItems(onItemUpdates);

            // When
            function onItemUpdates(context, args){
                createdDataSource.setProperty('FirstName', 'Иванидзе');
            }

            // Then
            setTimeout(function(){
                assert.equal(window.documentDataSourceTest, 1, 'Event OnSelectedItemChanged is called');
                done();
            }, 200);
        });

        it('should create ds from metadata', function (done) {
            // Given
            window.providerRegister.register('DocumentDataSource', FakeRestDataProvider);

            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        DocumentDataSource: {
                            "Name": "DataSource1",
                            "DocumentId": "Whatever"
                        }
                    }
                ],
                Items: []
            };

            var dataSource;

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                dataSource = view.getContext().dataSources['DataSource1'];
                dataSource.updateItems(handleItemsReady);
            }

            function handleItemsReady(){
                assert.isTrue(dataSource.getItems().length > 0, 'DS was update items');
                assert.equal(FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?skip=0&take=15', 'requested url is right');

                done();
            }
        });

        it('should update items on filter changing', function (done) {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        DocumentDataSource: {
                            "Name": "DataSource1",
                            "DocumentId": "Whatever"
                        }
                    }
                ],
                Items: []
            };
            var result = '';

            var dataSource;

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){

                $layout.detach();

                dataSource = view.getContext().dataSources['DataSource1'];

                dataSource.onItemsUpdated(function(){
                    result += '1';

                    if(result == '11'){
                        assert.equal(FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?filter=eq(id,7)&skip=0&take=15', 'requested url is right (second)');
                        done();
                    }
                });

                dataSource.setFilter('eq(id,4)');

                dataSource.updateItems(handleItemsReady1);
            }

            function handleItemsReady1(){
                assert.equal(result, '', 'its first updated of item');
                assert.equal(FakeRestDataProvider.prototype.lastSendedUrl, InfinniUI.config.serverUrl + '/documents/Whatever?filter=eq(id,4)&skip=0&take=15', 'requested url is right (first)');

                dataSource.setFilter('eq(id,<%uid%>)');
                dataSource.setFilterParams({
                    uid: 7
                });
            }
        });

    });

});