describe('Label', function () {
    var label;

    beforeEach(function () {
        label = new Label();
    });

    describe('Render', function () {

        describe('Setting the properties', function () {

            it('Setting property: name', function () {
                //Given
                var $el = label.render();
                assert.isUndefined($el.attr('pl-data-pl-name'));

                //When
                label.setName('NewLabel');

                //Then
                assert.equal($el.attr('data-pl-name'), 'NewLabel');
            });

            it('Setting property: visible', function () {
                //Given
                var $el = label.render();
                assert.isFalse($el.hasClass('hidden'));

                //When
                label.setVisible(false);

                //Then
                assert.isTrue($el.hasClass('hidden'));
            });

            it('Setting property: horizontalAlignment', function () {
                //Given
                var $el = label.render();
                assert.isTrue($el.hasClass('text-right'));
                assert.isFalse($el.hasClass('text-left'));
                assert.isFalse($el.hasClass('text-center'));
                assert.isFalse($el.hasClass('text-justify'));

                //When
                label.setHorizontalTextAlignment('Left');

                //Then
                assert.isTrue($el.hasClass('text-left'));
                assert.isFalse($el.hasClass('text-right'));
                assert.isFalse($el.hasClass('text-center'));
                assert.isFalse($el.hasClass('text-justify'));
            });

            it('Setting property: text', function () {
                //Given
                label.setText('Default Label');

                var $el = label.render(),
                    $label = $('label', $el);

                assert.equal($label.html(), 'Default Label');

                //When
                label.setText('New Label');

                //Then
                assert.equal($label.html(), 'New Label');
            });
        });

    });

    describe('Data binding', function () {
        it('should set Label from property binding', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            $('body').append($('<div>').attr('id', 'page-content'));

            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        DocumentDataSource: {
                            Name : "PatientDataSource",
                            ConfigId: 'Demography',
                            DocumentId: 'Patient',
                            IdProperty: 'Id',
                            CreateAction: 'CreateDocument',
                            GetAction: 'GetDocument',
                            UpdateAction: 'SetDocument',
                            DeleteAction: 'DeleteDocument',
                            FillCreatedItem: true
                        }
                    }
                ],
                LayoutPanel: {
                    StackPanel: {
                        Name: 'MainViewPanel',
                        Items: [
                            {
                                Label: {
                                    Name: 'Label1',
                                    Value : {
                                        PropertyBinding : {
                                            DataSource : 'PatientDataSource',
                                            Property : '$.LastName'
                                        }
                                    },
                                    Text: 'Text Label'
                                }
                            }
                        ]
                    }
                }
            };

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType(fakeView(), 'View', metadata);
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function(view){
                view.open();

                var itemToSelect = null;

                view.getDataSource('PatientDataSource').getItems(
                    function(data){
                        itemToSelect = data[0];
                        view.getDataSource('PatientDataSource').setSelectedItem(itemToSelect);
//                        console.log(itemToSelect);
//                        console.log($('#page-content').find('label').html());
                        assert.equal($('#page-content').find('label').html(), itemToSelect.LastName);

                        $('#page-content').remove();
                    });
            });
        });
    });

});
