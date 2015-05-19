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
        },
        parentView = fakeView();

    describe('build DocumentDataSource', function () {
        it('should build documentDataSource', function () {
            var createdDataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);
            assert.equal(createdDataSource.getConfigId(), 'Demography');
            assert.equal(createdDataSource.getDocumentId(), 'Patient');
            assert.equal(createdDataSource.getIdProperty(), 'Id');
            assert.equal(createdDataSource.getCreateAction(), 'CreateDocument');
            assert.equal(createdDataSource.getGetAction(), 'GetDocument');
            assert.equal(createdDataSource.getUpdateAction(), 'SetDocument');
            assert.equal(createdDataSource.getDeleteAction(), 'DeleteDocument');
            assert.isTrue(createdDataSource.getFillCreatedItem());
        });
    });

    describe('dataSource CRUD operations', function () {
        it('should get list of data', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);
            dataSource.setListMode();

            var invokes = false;

            dataSource.getItems(function (data) {
                invokes = true;
                assert.isTrue(data.length > 0, "data provider returns items");
            });

            assert.isTrue(invokes, "data provider has been invoked");
        });

        it('should get editing record', function () {


            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);
            dataSource.setEditMode();
            dataSource.setIdFilter('1');

            var items = dataSource.getItems(
                function (data) {
                    assert.equal(data.length, 1);
                    assert.equal(data[0].Id, '1');
                });
        });

        it('should update items', function () {


            var mode = 'Created';

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider(function () {
                    return mode;
                });
            });

            //parentView need to specify or handler shouldn't invoked because of empty context. Context needed to run script handler
            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);
            dataSource.setListMode();
            dataSource.resumeUpdate('noBindings');
            dataSource.resumeUpdate('viewNotReady');
            dataSource.getItems(function (items) {
                assert.equal(items[0].Id, '1');
                assert.equal(items[1].Id, '2');
            });


            //changes to update mode forces reload updated items to datasource
            mode = 'Updated';

            var itemsUpdatedInvokes = false;

            dataSource.onItemsUpdated(function (dataSourceName, value) {
                itemsUpdatedInvokes = true;
            });

            dataSource.updateItems();

            assert.isTrue(itemsUpdatedInvokes, 'data source items has not been updated');

            dataSource.getItems(function (items) {
                assert.equal(items[0].Id, '4');
                assert.equal(items[1].Id, '5');
            });


        });

        it('should save item', function () {
            //Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            //parentView need to specify or handler shouldn't invoked because of empty context. Context needed to run script handler
            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);
            dataSource.setListMode();

            var item = {
                "Id": '1',
                "FirstName": 'Степан',
                "LastName": 'Степанов'
            };

            //check onItemSavedHandler invoke
            var onItemSavedHandlerInvokes = false;
            dataSource.onItemSaved(function (dataSourceName, value) {
                onItemSavedHandlerInvokes = true;
                assert.equal(value.value, item);
            });

            //record with identifier '1' should be replaced
            //When
            dataSource.saveItem(item);

            assert.isTrue(onItemSavedHandlerInvokes);

            //Then
            dataSource.getItems(function (items) {
                assert.equal(items[0].FirstName, 'Степан');
                assert.equal(items[0].LastName, 'Степанов');
            });

        });

        it('should create item', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var item = null;

            var onItemCreatedInvokes = false;
            dataSource.onItemCreated(function (dataSourceName, value) {
                onItemCreatedInvokes = true;
            });

            dataSource.createItem(function (data) {
                assert.isTrue(dataSource.isModifiedItems());
            }, function (err) {
                assert.fail(err);
            });

        });

        it('should delete item', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            //parentView need to specify or handler shouldn't invoked because of empty context. Context needed to run script handler
            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);
            dataSource.setListMode();

            var items = null;
            dataSource.getItems(function (data) {
                items = data;
            });

            var onItemDeletedHandlerInvokes = false;
            dataSource.onItemDeleted(function (dataSourceName, value) {
                onItemDeletedHandlerInvokes = true;
                assert.equal(value.value, items[0]);
            });

            var itemDeletedId = items[0].Id;
            dataSource.deleteItem(items[0]);

            items = dataSource.getItems(function (items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].Id === itemDeletedId) {
                        assert.fail();
                    }
                }
            });

            assert.isTrue(onItemDeletedHandlerInvokes);
        });
    });

    describe('dataSource paging operations', function () {
        it('should change page of data for list mode', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);
            dataSource.setListMode();

            dataSource.setPageSize(2);
            dataSource.setPageNumber(1);

            dataSource.getItems(function (items) {
                assert.equal(items.length, 1);
                assert.equal(items[0].Id, '10');
            }, function (err) {
                assert.fail(err)
            });
        });


        it('should not effect pagesize and pagenumber for editdatasource', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(fakeView(), 'DocumentDataSource', metadata);

            dataSource.setIdFilter('1');
            dataSource.setEditMode();
            dataSource.setPageSize(2);
            dataSource.setPageNumber(10);

            dataSource.getItems(function (items) {
                assert.equal(items.length, 1);
                assert.equal(items[0].Id, '1');
            });

        });
    });

    describe('dataSource events invoking', function () {

        var parentView = fakeView(),
            view = fakeView({
                name: 'TestView'
            });

        it('should set parentview for dataSource', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(view, 'DocumentDataSource', metadata);

            assert.equal(dataSource.getView(), view);
        });

        it('should invoke onPageNumberChanged and onPageSizeChanged for dataSource in list Mode', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var pageNumber = -1;
            var pageSize = 20;


            dataSource.onPageNumberChanged(function (dataSourceName, value) {
                pageNumber = value.value;
            });

            dataSource.onPageSizeChanged(function (dataSourceName, value) {
                pageSize = value.value;
            });

            dataSource.setPageNumber(1);

            assert.equal(pageNumber, 1);

            dataSource.setPageSize(20);

            assert.equal(pageSize, 20);
        });
    });

    describe('dataSource and dataBinding interaction', function () {

        var parentView = fakeView(),
            view = fakeView();

        it('should add and remove data binding', function () {

            var dataBinding = new PropertyBinding(view);

            var wasEvent = false;

            var action = function (dataSourceName, value) {
                wasEvent = true;
            };
            dataBinding.onSetPropertyValue(action);

            dataBinding.setPropertyValue(1);

            assert.equal(wasEvent, true);

            //Отписка от события не реализована
//            dataBinding.removeOnSetPropertyValue(action);
//
//            wasEvent = false;
//
//            dataBinding.setPropertyValue(1);
//
//            assert.equal(wasEvent, false);

        });
        it('should track dataBinding property value changed ', function () {


            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var dataBinding = new PropertyBinding(parentView, dataSource.getName(), '$.LastName');

            var items = null;
            dataSource.getItems(function (data) {
                items = data;
            });

            dataSource.resumeUpdate();

            dataSource.addDataBinding(dataBinding);

            var valueSelected = null;
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                valueSelected = value.value;
            });

            dataSource.setSelectedItem(items[0]);

            assert.equal(valueSelected, 'Иванов');
        });

        it('should invoke dataBinding onPropertyValueChanged handler on reload data on dataSource', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var dataBinding = new PropertyBinding(parentView, dataSource.getName(), null);

            dataSource.addDataBinding(dataBinding);

            var itemsUpdated = false;
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                itemsUpdated = true;
            });

            dataSource.resumeUpdate('viewNotReady');

            assert.isTrue(itemsUpdated);
        });

        it('should invoke dataSource onUpdateItems handler on reload data on dataSource', function () {
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var itemsUpdated = false;
            dataSource.onItemsUpdated(function (dataSourceName, value) {
                itemsUpdated = true;
            });

            dataSource.resumeUpdate('viewNotReady');
            dataSource.resumeUpdate('noBindings');
            assert.isTrue(itemsUpdated);
        });

        it('should invoke dataSource onSelectedItem handler on select item in dataSource', function () {

            var provider = new FakeDataProvider();

            var itemToSelect = null;
            provider.getItems(null, 0, 10, null, function (data) {
                    itemToSelect = data[0];
                }
            );

            window.providerRegister.register('DocumentDataSource', function () {
                return provider;
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);


            var itemSelected = false;
            dataSource.onSelectedItemChanged(function (dataSourceName, value) {
                itemSelected = true;
            });

            dataSource.resumeUpdate();
            dataSource.setSelectedItem(itemToSelect);


            assert.isTrue(itemSelected);
        });

        it('should invoke dataSource specified onSelectedItem handler on select item in dataSource', function () {

            var provider = new FakeDataProvider();

            var itemToSelect = null;
            provider.getItems(null, 0, 10, null, function (data) {
                itemToSelect = data[0];
            });

            window.providerRegister.register('DocumentDataSource', function () {
                return provider;
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            dataSource.setSelectedItem(itemToSelect);

            var selectedItem = dataSource.getSelectedItem();

            assert.equal(selectedItem, itemToSelect);
        });
        it('should dataBinding setPropertyValue invoke dataBinding onSetPropertyValue event', function () {

            var provider = new FakeDataProvider();

            window.providerRegister.register('DocumentDataSource', function () {
                return provider;
            });

            var propertyValue = null;
            provider.getItems(null, 0, 10, null, function (data) {
                propertyValue = data[0];
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var dataBinding = new PropertyBinding(parentView, dataSource.getName(), null);

            dataSource.resumeUpdate();

            dataSource.addDataBinding(dataBinding);

            var onSetPropertyValueInvokes = false;

            dataBinding.onSetPropertyValue(function (dataSourceName, value) {
                onSetPropertyValueInvokes = true;
            });


            dataBinding.setPropertyValue(propertyValue);

            assert.isTrue(onSetPropertyValueInvokes);
        });
        it('should dataBinding setPropertyValue invoke dataSource handler and notify all dataSource related dataBindings', function () {
            var provider = new FakeDataProvider();

            window.providerRegister.register('DocumentDataSource', function () {
                return provider;
            });

            var propertyValue = null;
            provider.getItems(null, 0, 10, null, function (data) {
                propertyValue = data[1];
            });

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var dataBinding = new PropertyBinding(parentView, dataSource.getName(), '$.LastName');

            var dataBindingNotified = new PropertyBinding(parentView, dataSource.getName(), '$.LastName');

            dataSource.resumeUpdate();

            dataSource.addDataBinding(dataBinding);

            dataSource.addDataBinding(dataBindingNotified);

            var wasNotifyDataBinding = false;

            dataBinding.setPropertyValue(propertyValue);

            dataBindingNotified.onPropertyValueChanged(function (dataSourceName, value) {
                wasNotifyDataBinding = true;
                assert.equal(value.value, propertyValue);
            });


            assert.isTrue(wasNotifyDataBinding);
        });
        it('should dataBinding setPropertyValue invoke dataSource handler and set isModified flag and replace selectedItem properties', function () {
            var provider = new FakeDataProvider();

            window.providerRegister.register('DocumentDataSource', function () {
                return provider;
            });

            var propertyValue = null;
            provider.getItems(null, 0, 10, null, function (data) {
                propertyValue = data[0];
            });

            //LastName should changed on
            var propertyValueChanged = 'Сидоров';

            var dataSource = builder.buildType(parentView, 'DocumentDataSource', metadata);

            var dataBinding = new PropertyBinding(parentView, dataSource.getName(), '$.LastName');

            dataSource.resumeUpdate();

            dataSource.addDataBinding(dataBinding);

            dataSource.setSelectedItem(propertyValue);

            dataBinding.setPropertyValue(propertyValueChanged);

            assert.isTrue(dataSource.isModified(dataSource.getSelectedItem()));

            assert.equal(dataSource.getSelectedItem().LastName, propertyValueChanged);

            dataSource.getItems(function (data) {
                assert.isFalse(dataSource.isModified(data[1]));
            });

            //check clear isModified for item on saveItem
            dataSource.saveItem(dataSource.getSelectedItem());

            assert.isFalse(dataSource.isModified(dataSource.getSelectedItem()));
        });

    });
});
