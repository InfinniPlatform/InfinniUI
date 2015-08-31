describe('DataSourceBuilder', function () {
    var builder = new ApplicationBuilder(),
        metadata = {
            Name: 'PatientDataSource',
            ConfigId: 'Demography',
            DocumentId: 'Patient',
            CreateAction: 'CreateDocument',
            GetAction: 'GetDocument',
            UpdateAction: 'SetDocument',
            DeleteAction: 'DeleteDocument',
            FillCreatedItem: true,
            PageNumber: 1,
            PageSize: 5,

            OnSelectedItemModified: {
                Name: 'OnSelectedItemModified'
            }
        };

    window.providerRegister.register('DocumentDataSource', FakeDataProvider);

    describe('build DocumentDataSource', function () {
        it('should build documentDataSource', function () {
            // Given When
            var createdDataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);

            // Then
            assert.equal(createdDataSource.getConfigId(), 'Demography');
            assert.equal(createdDataSource.getDocumentId(), 'Patient');
            assert.equal(createdDataSource.getIdProperty(), 'Id');
            assert.equal(createdDataSource.getCreateAction(), 'CreateDocument');
            assert.equal(createdDataSource.getUpdateAction(), 'SetDocument');
            assert.equal(createdDataSource.getDeleteAction(), 'DeleteDocument');
            assert.equal(createdDataSource.getPageSize(), 5, 'PageSize');
            assert.equal(createdDataSource.getPageNumber(), 1, 'PageNumber');
            assert.isTrue(createdDataSource.getFillCreatedItem(), 'Value of FillCreatedItem');
        });

        it('should subscribe documentDataSource on changeProperty', function (done) {
            // Given
            var view = fakeView(),
                createdDataSource = builder.buildType(view, 'DocumentDataSource', metadata);

            view.scripts = {
                OnSelectedItemModified: new Script('window.documentDataSourceTest = 1;', 'OnSelectedItemModified')
            }

            createdDataSource.updateItems(onItemUpdates);

            // When
            function onItemUpdates(context, args){
                createdDataSource.setProperty('FirstName', 'Иванидзе');
            }

            // Then
            setTimeout(function(){
                assert.equal(window.documentDataSourceTest, 1, 'Event onSelectedItemModified is called');
                done();
            }, 200);
        });


    });

});