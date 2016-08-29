describe('SelectAction', function () {
    it('successful build', function () {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();

        var metadata = {
            SelectAction: {
                LinkView: {
                    ExistsView: {
                    }
                },
                SourceValue: {
                    Source: 'FirstDS',
                    Property: 'Name'
                },
                DestinationValue: {
                    Source: 'SecondDS',
                    Property: 'Name'
                }
            }
        };

        // When
        var selectAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( selectAction );
        assert.isNotNull( selectAction.execute, 'action should have execute' );
    });

    it('should set selected item if dialog result is accepted', function (done) {
        // Given
        var viewMetadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                            {
                                SelectedObject: "empty"
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "SelectButton",
                    "Action": {
                        "SelectAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "$.SelectedObject"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource",
                                "Property": "$"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Name": "SelectView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource",
                                                    "IsLazy": false,
                                                    "Items": [
                                                        {
                                                            "Name": "first"
                                                        },
                                                        {
                                                            "Name": "second"
                                                        }
                                                    ]
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

        testHelper.applyViewMetadata(viewMetadata, function(view){
            var selectBtn = view.context.controls['SelectButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal(destinationDS.getSelectedItem().SelectedObject, "empty");

            // When
            selectBtn.click();

            var childView = view.context.controls['SelectView'];
            var sourceDS = childView.context.dataSources['MainDataSource'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            var selectedValue = sourceDS.getItems()[1];
            sourceDS.setSelectedItem(selectedValue);

            acceptBtn.click();

            // Then
            assert.deepEqual(destinationDS.getSelectedItem().SelectedObject, selectedValue);

            done();
            view.close();
        });
    });

    it('should not set selected item if dialog result is cancel', function (done) {
        // Given
        // todo: выяснить почему, если вынести viewMetadata из этого и предыдущего тестов, то они работают с одной и той же view
        var viewMetadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                            {
                                SelectedObject: "empty"
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "SelectButton",
                    "Action": {
                        "SelectAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "$.SelectedObject"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource",
                                "Property": "$"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Name": "SelectView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource",
                                                    "IsLazy": false,
                                                    "Items": [
                                                        {
                                                            "Name": "first"
                                                        },
                                                        {
                                                            "Name": "second"
                                                        }
                                                    ]
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

        testHelper.applyViewMetadata(viewMetadata, function(view){
            var selectBtn = view.context.controls['SelectButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal(destinationDS.getSelectedItem().SelectedObject, "empty");

            // When
            selectBtn.click();

            var childView = view.context.controls['SelectView'];
            var sourceDS = childView.context.dataSources['MainDataSource'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            var selectedValue = sourceDS.getItems()[1];
            sourceDS.setSelectedItem(selectedValue);

            childView.close();

            // Then
            assert.equal(destinationDS.getSelectedItem().SelectedObject, "empty");

            done();
            view.close();
        });
    });

    it('should call onExecuted', function (done) {
        // Given
        var viewMetadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "IsLazy": false,
                        "Items": [
                            {
                                SelectedObject: "empty"
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "SelectButton",
                    "Action": {
                        "SelectAction": {
                            "OnExecuted": "{ window.onExecutedWasCalled = true; }",
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "$.SelectedObject"
                            },
                            "SourceValue": {
                                "Source": "MainDataSource",
                                "Property": "$"
                            },
                            "LinkView": {
                                "InlineView": {
                                    "OpenMode": "Dialog",
                                    "View": {
                                        "Name": "SelectView",
                                        "DataSources": [
                                            {
                                                "ObjectDataSource": {
                                                    "Name": "MainDataSource",
                                                    "IsLazy": false,
                                                    "Items": [ {} ]
                                                }
                                            }
                                        ],
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "AcceptBtn",
                                                    "Action": {
                                                        "AcceptAction": {}
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

        testHelper.applyViewMetadata(viewMetadata, function(view){
            var selectBtn = view.context.controls['SelectButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            // When
            selectBtn.click();

            var childView = view.context.controls['SelectView'];
            var acceptBtn = childView.context.controls['AcceptBtn'];

            assert.isUndefined(window.onExecutedWasCalled);

            acceptBtn.click();

            // Then
            assert.isTrue(window.onExecutedWasCalled);

            done();

            // cleanup
            window.onExecutedWasCalled = undefined;
            view.close();
        });
    });
});
