describe('ImageBox', function () {
    describe('Render', function () {
        var element;

        beforeEach (function () {
            element = new ImageBox();
        });

        it('Default property value', function () {
            // Given

            //$('body').append(element.render());
            assert.strictEqual(element.getReadOnly(), false);
            assert.strictEqual(element.getMaxSize(), 0);

        });

        it('Setting properties', function () {

            // Given
            element.setReadOnly(true);
            element.setAcceptTypes(['video/*']);
            element.setMaxSize(50000);
            element.setValue({Info: {}});

            assert.equal(element.getReadOnly(), true);
            assert.deepEqual(element.getAcceptTypes(), ['video/*']);
            assert.deepEqual(element.getValue(), {Info: {}});
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
//            var linkView = new LinkView(null, function (resultCallback) {
//                var builder = new ApplicationBuilder();
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