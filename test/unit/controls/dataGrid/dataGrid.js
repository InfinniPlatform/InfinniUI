describe('DataGrid', function () {
    describe('render', function () {

        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var grid = new DataGrid(),$el, $control;

            $el = grid.render();
            $control = $el.find('table');

            assert.lengthOf($control, 1);
            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($el.hasClass('pull-left'));
            assert.isFalse($el.hasClass('pull-right'));
            assert.isFalse($el.hasClass('center-block'));

            // When
            grid.setHorizontalAlignment('Right');

            //Then
            assert.isTrue($el.hasClass('pull-right'));
        });

        it('Setting Columns', function () {
            // Given
            var metadata = {
                "Name": "DataGrid1",
                "Columns": [
                    {
                        "Name": "Column1",
                        "Text": "Фамилия",
                        "DisplayProperty": "LastName"
                    },
                    {
                        "Name": "Column2",
                        "Text": "Имя",
                        "DisplayProperty": "FirstName"
                    },
                    {
                        "Name": "Column3",
                        "Text": "Отчество",
                        "DisplayProperty": "MiddleName",
                        "Visible": false
                    }
                ]
            };
            var builder = new DataGridBuilder();
            var grid = builder.build(new ApplicationBuilder(), null, metadata);

            var el = grid.render();
            var th = el.find('th');

            assert.lengthOf(th, 3);
            assert.equal(th[0].innerText, 'Фамилия');
            assert.equal(th[1].innerText, 'Имя');
            assert.equal(th[2].innerText, 'Отчество');

            assert.notEqual(th[0].style.display.toLowerCase(), 'none');
            assert.notEqual(th[1].style.display.toLowerCase(), 'none');
            assert.isTrue(th[2].classList.contains('hidden'));


            //When
            grid.getColumns()[2].setVisible(true);
            grid.getColumns()[1].setText('Name');

            //Then
            assert.equal(th[0].innerText, 'Фамилия');
            assert.equal(th[1].innerText, 'Name');
            assert.equal(th[2].innerText, 'Отчество');
            assert.notEqual(th[0].style.display.toLowerCase(), 'none');
            assert.notEqual(th[1].style.display.toLowerCase(), 'none');
            assert.notEqual(th[2].style.display.toLowerCase(), 'none');

        });

    });


    describe('DataGrid data binding', function () {
        it('should set DataGrid.items from property binding', function () {
            //Given
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });


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
                                DataGrid: {
                                    "Name": "DataGrid1",
                                    "Columns": [
                                        {
                                            "Name": "Column1",
                                            "Text": "Фамилия",
                                            "DisplayProperty": "LastName"
                                        },
                                        {
                                            "Name": "Column2",
                                            "Text": "Имя",
                                            "DisplayProperty": "FirstName"
                                        },
                                        {
                                            "Name": "Column3",
                                            "Text": "Отчество",
                                            "DisplayProperty": "MiddleName",
                                            "Visible": false
                                        }
                                    ],
                                    "Items": {
                                        "PropertyBinding": {
                                            "DataSource": "PatientsDataSource"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            };

            var $target = $('<div>');

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType(fakeView(), 'View', metadata);
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            linkView.createView(function(view){
                view.open();

                var itemToSelect = null,
                    dataSource = view.getDataSource('PatientDataSource');

                assert.isNotNull($target.find('table'));

                dataSource.getItems(function(data){
                    assert.notEqual($target.find('table>tbody').html(), '');
                });

            });
        });
    });

});