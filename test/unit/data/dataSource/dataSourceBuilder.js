describe('DataSourceBuilder', function () {

    var builder = new ApplicationBuilder();

    window.providerRegister.register('DocumentDataSource', FakeDataProvider);

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

                    onPropertyChanged: {
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

        it('should create ds from metadata', function () {
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
            }
        });

    });

});