describe('AddAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ name: 'SomeDS', view: view });

        view.getDataSources().push(dataSource);

        var metadata = {
            AddAction: {
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
        var addAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( addAction );
        assert.isNotNull( addAction.execute, 'action should have execute' );
    });

    it('should add item to ObjectDataSource', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": []
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "AddButton",
                    "Action": {
                        "AddAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": ""
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Add",
                                        "Name": "AddView",
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
            var addBtn = view.context.controls['AddButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal(destinationDS.getItems().length, 0);

            // When
            addBtn.click();

            var childView = view.context.controls['AddView'];
            var sourceDS = childView.context.dataSources['MainDataSource'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            var newItem = sourceDS.getSelectedItem();
            newItem.name = "New";
            sourceDS.setSelectedItem(newItem);

            acceptBtn.click();

            // Then
            var destinationItems = destinationDS.getItems();
            assert.equal(destinationItems.length, 1);
            assert.equal(destinationItems[0].name, "New");

            done();
            view.close();
        });
    });

    it('should add item to DocumentDataSource', function (done) {
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
                    "Name": "AddButton",
                    "Action": {
                        "AddAction": {
                            "DestinationValue": {
                                "Source": "DocumentDataSource"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Text": "Add",
                                        "Name": "AddView",
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
                    var addBtn = view.context.controls['AddButton'];
                    var destinationDS = view.context.dataSources.DocumentDataSource;
                    var initCount = destinationDS.getItems().length;

                    // When
                    addBtn.click();

                    var childView = view.context.controls['AddView'];
                    var sourceDS = childView.context.dataSources['MainDataSource'];
                    var saveBtn = childView.context.controls['SaveBtn'];

                    var newItem = sourceDS.getSelectedItem();

                    assert.notInclude(destinationDS.getItems(), newItem);

                    sourceDS.setProperty('FirstName', 'Test');
                    sourceDS.setProperty('LastName', 'Test');

                    saveBtn.click();

                    // Then
                    view.context.dataSources.DocumentDataSource.updateItems( function() {
                        var destinationItems = destinationDS.getItems();
                        assert.equal(destinationItems.length, initCount + 1);
                        assert.include(destinationItems, newItem);

                        done();

                        view.close();
                    });
                }
            );
        });
    });

    it('should suspend SourceValue', function(done){
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
                    "Name": "AddButton",
                    "Action": {
                        "AddAction": {
                            "DestinationValue": {
                                "Source": "DocumentDataSource"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Name": "AddView",
                                        "DataSources": [
                                            {
                                                "DocumentDataSource": {
                                                    "Name": "MainDataSource"
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
                    var addBtn = view.context.controls['AddButton'];

                    // When
                    addBtn.click();

                    var childView = view.context.controls['AddView'];
                    var sourceDS = childView.context.dataSources['MainDataSource'];

                    // Then
                    assert.isTrue(sourceDS.isUpdateSuspended());

                    done();

                    view.close();
                }
            );
        });
    });
});
