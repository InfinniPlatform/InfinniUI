describe('ImageBox', function () {

    function delay(min, max) {
        if (typeof min === 'undefined') {
            min = 100;
        }
        if (typeof  max === 'undefined') {
            max = 200;
        }

        return Math.ceil(Math.random() * (max - min) + min);
    }

    describe('API', function () {
        var builder = new InfinniUI.ApplicationBuilder();
        var element = builder.buildType('ImageBox', {});

        describe('Implementing ImageBox Methods', function () {
            ['getMaxSize', 'setMaxSize', 'getAcceptTypes']
                .forEach(function (methodName) {
                    it(methodName, function () {
                        testHelper.checkMethod(element, methodName);
                    });

                });
        });

        describe('Implementing EditorBase Methods', function () {
            testHelper.checkEditorBaseMethods(element);
        });

        describe('Implementing Element Methods', function () {
            testHelper.checkElementMethods(element);
        });
    });

    describe('debug', function () {

        it('render', function () {
            var builder = new InfinniUI.ApplicationBuilder();
            var view = new InfinniUI.View();
            var metadata = {
                MaxSize: 0,
                AcceptTypes: [
                    'image/png'
                ]
            };

            var element = builder.buildType("ImageBox", metadata, {parent: view, parentView: view, builder: builder});

            var $el = element.render();
            //$('body').append($el);
        });


    });

    describe('Upload new file', function () {

        //beforeEach(function () {
        //    //register fake upload provider
        //    window.InfinniUI.providerRegister.register('DocumentFileProvider', function (metadata) {
        //        return {
        //            uploadFile: function () {
        //                var deferred = $.Deferred();
        //                setTimeout(function () {
        //                    deferred.resolve();
        //                }, delay());
        //
        //                return deferred.promise();
        //            },
        //            getFileUrl: function (fieldName, instanceId) {
        //                return [fieldName, instanceId, 'fake.html'].join('.');
        //            }
        //        };
        //    });

        //
        //it('Should set image url', function (done) {
        //    var builder = new InfinniUI.ApplicationBuilder();
        //
        //    //Build view
        //    var view = new InfinniUI.View();
        //
        //    //Build DataSource
        //    var dataSources = view.getDataSources();
        //    var dsMetadata = {
        //        Name: 'MyDataSource',
        //        ConfigId: 'MyConfig',
        //        DocumentId: 'MyDocument'
        //    };
        //    var ds = builder.buildType('DocumentDataSource', dsMetadata, {parentView: view});
        //    dataSources.add(ds);
        //
        //    var PROPERTY_NAME = 'photo';
        //
        //    //build ImageBox
        //    var imageBoxMetadata = {
        //        Value: {
        //            Source: 'MyDataSource',
        //            Property: PROPERTY_NAME
        //        }
        //    };
        //    var imageBox = builder.buildType('ImageBox', imageBoxMetadata, {parent: view, parentView: view});
        //
        //    imageBox.render();
        //
        //    ds.onItemsUpdated(function () {
        //        var items = ds.getItems();
        //        ds.setSelectedItem(items[0]);
        //        assert.equal(imageBox.getValue(), [PROPERTY_NAME, '1', 'fake.html'].join('.'), 'Image URL for existing item');
        //
        //        ds.createItem(function (context, args) {
        //            imageBox.onPropertyChanged('value', function (context, args) {
        //                var url = [PROPERTY_NAME, 'MyPhotoId', 'fake.html'].join('.');
        //                assert.equal(imageBox.getValue(), url, 'image URL for new item');
        //                done();
        //            });
        //
        //            ds.setProperty(PROPERTY_NAME, {ContentId: 'MyPhotoId2'});
        //        });
        //    });
        //
        //});

    });

    describe('Render', function () {
        var element;

        beforeEach(function () {
            element = new InfinniUI.ImageBox();
        });

        it('Setting properties', function () {

            // Given
            element.setEnabled(true);
            element.setAcceptTypes(['video/*']);
            element.setMaxSize(50000);
            //element.setValue({Info: {}});

            assert.equal(element.getEnabled(), true);
            assert.deepEqual(element.getAcceptTypes().toArray(), ['video/*']);
            //assert.deepEqual(element.getValue(), {Info: {}});
            assert.equal(element.getMaxSize(), 50000);
        });

    });


//    describe('ImageBox data binding', function () {
//        it('should set ImageBox.value from property binding', function () {
//
//            //это говнокод
//            $('#page-content').empty();
//
//            window.providerRegister.register('UploadDocumentDataSource', function (metadataValue) {
//                return new DataProviderUpload(new QueryConstructorUpload('http://127.0.0.1:8888', metadataValue));
//            });
//
//            window.providerRegister.register('DocumentDataSource', function () {
//                return new FakeDataProvider();
//            });
//
//            $('body').append($('<div>').attr('id', 'page-content'));
//
//            var metadata = {
//                Text: 'Пациенты',
//                DataSources: [
//                    {
//                        DocumentDataSource: {
//                            Name : "PatientDataSource",
//                            ConfigId: 'Demography',
//                            DocumentId: 'Patient',
//                            IdProperty: 'Id',
//                            CreateAction: 'CreateDocument',
//                            GetAction: 'GetDocument',
//                            UpdateAction: 'SetDocument',
//                            DeleteAction: 'DeleteDocument',
//                            FillCreatedItem: true
//                        }
//                    }
//                ],
//                LayoutPanel: {
//                    StackPanel: {
//                        Name: 'MainViewPanel',
//                        Items: [
//                            {
//                                ImageBox: {
//                                    Name: 'ImageBox1',
//                                    Value : {
//                                        FileBinding : {
//                                            DataSource : 'PatientDataSource',
//                                            Property : '$.photo'
//                                        }
//                                    }
//                                }
//                            }
//                        ]
//                    }
//                }
//            };
//
//            var linkView = new InfinniUI.LinkView(null, function (resultCallback) {
//                var builder = new InfinniUI.ApplicationBuilder();
//                var view = builder.buildType(fakeView(), 'View', metadata);
//                resultCallback(view);
//            });
//            linkView.setOpenMode('Application');
//
//            linkView.createView(function(view){
//                view.open();
//
//                var itemToSelect = null;
//                view.getDataSource('PatientDataSource').getItems(function(data){
//                    itemToSelect = data[1];
//                });
//
//                view.getDataSource('PatientDataSource').setSelectedItem(itemToSelect);
//
//
//                window.maindatasource = view.getDataSource('PatientDataSource');
//
//                //check text
//               // assert.equal($('#page-content').find('input:text').val(), itemToSelect.LastName);
//               // $('#page-content').remove();
//            });
//        });
//    });


});
