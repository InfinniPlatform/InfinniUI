describe('EditAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ name: 'SomeDS', view: view });

        view.getDataSources().push(dataSource);

        var metadata = {
            EditAction: {
                LinkView: {
                    InlineView: {

                    }
                },
                DestinationValue: {
                    Source: 'SomeDS'
                },
                SourceValue: {
                    Source: 'EditDS'
                }
            }
        };

        // When
        var editAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( editAction );
        assert.isNotNull( editAction.execute, 'action should have execute' );
    });

    it('should edit item from ObjectDataSource', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                            {
                                "Name": "OldValue"
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "EditButton",
                    "Action": {
                        "EditAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "0"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Edit",
                                        "Name": "EditView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource"
                                                }
                                            }
                                        ],
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "AcceptBtn",
                                                    "Action": {
                                                        "AcceptAction": {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            var edtBtn = view.context.controls['EditButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal(destinationDS.getItems()[0].Name, "OldValue");

            // When
            edtBtn.click();

            var childView = view.context.controls['EditView'];
            var sourceDS = childView.context.dataSources['MainDataSource'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            var selectedItem = sourceDS.getSelectedItem();
            selectedItem.Name = "NewValue";
            sourceDS.setSelectedItem(selectedItem);

            acceptBtn.click();

            // Then
            assert.equal(destinationDS.getItems()[0].Name, "NewValue");

            done();
            view.close();
        });
    });

    it('should edit item from DocumentDataSource', function (done) {
        // Given
        window.InfinniUI.providerRegister.register('DocumentDataSource', StaticFakeDataProvider);

        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "DocumentDataSource": {
                        "Name": "DocumentDataSource",
                        "IsLazy": false
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "EditButton",
                    "Action": {
                        "EditAction": {
                            "DestinationValue": {
                                "Source": "DocumentDataSource",
                                "Property": "0"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Edit",
                                        "Name": "EditView",
                                        "DataSources": [
                                            {
                                                "DocumentDataSource": {
                                                    "Name": "MainDataSource"
                                                }
                                            }
                                        ],
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "SaveBtn",
                                                    "Action": {
                                                        "SaveAction": {
                                                            "DestinationValue": {
                                                                "Source": "MainDataSource"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            view.context.dataSources.DocumentDataSource.updateItems(
                function(){
                    var edtBtn = view.context.controls['EditButton'];
                    var destinationDS = view.context.dataSources.DocumentDataSource;

                    assert.isUndefined(destinationDS.getSelectedItem().isNewValueForTest);

                    // When
                    edtBtn.click();

                    var childView = view.context.controls['EditView'];
                    var sourceDS = childView.context.dataSources['MainDataSource'];
                    var saveBtn = childView.context.controls['SaveBtn'];

                    // что если setSelectedItem сработает раньше? мб лучше setTimeout?
                    sourceDS.onSelectedItemChanged( function() {
                        var editItem = sourceDS.getSelectedItem();
                        editItem.isNewValueForTest = true;
                        sourceDS.setSelectedItem( editItem );

                        saveBtn.click();

                        // Then
                        setTimeout(function(){
                            assert.isTrue(destinationDS.getSelectedItem().isNewValueForTest);
                            done();
                            view.close();
                        }, 250);
                    });
                }
            );
        });
    });

    it('should not open edit view when edit item is null if edit item is document', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "EditButton",
                    "Action": {
                        "EditAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "$"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Edit",
                                        "Name": "EditView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource"
                                                }
                                            }
                                        ],
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "AcceptBtn",
                                                    "Action": {
                                                        "AcceptAction": {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            var edtBtn = view.context.controls['EditButton'];

            // When
            edtBtn.click();

            var childView = view.context.controls['EditView'];

            // Then
            assert.isTrue( childView.isClosing );

            done();
            view.close();
        });
    });

    it('should open edit view when edit item is null if edit item is property', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                            {
                                "Id": "1",
                                "Address": null
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "EditButton",
                    "Action": {
                        "EditAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "$.Address"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Edit",
                                        "Name": "EditView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource"
                                                }
                                            }
                                        ],
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "AcceptBtn",
                                                    "Action": {
                                                        "AcceptAction": {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            var edtBtn = view.context.controls['EditButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.isNull(destinationDS.getProperty("$.Address"));

            // When
            edtBtn.click();

            var childView = view.context.controls['EditView'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            acceptBtn.click();

            // Then
            assert.isNotNull(destinationDS.getProperty("$.Address"));

            done();
            view.close();
        });
    });

});