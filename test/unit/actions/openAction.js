describe('OpenAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var metadata = {
            OpenAction: {
                LinkView: {
                    InlineView: {

                    }
                }
            }
        };

        // When
        var openAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( openAction );
        assert.isNotNull( openAction.execute, 'action should have execute' );
    });

    it('should open view', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "Items": [{

                "Button": {
                    "Name": "OpenViewButton",
                    "Action": {
                        "OpenAction": {
                            "LinkView": {
                                "InlineView": {
                                    "View": {
                                        "Text": "Child View",
                                        "Name": "ChildView"
                                    },
                                    "OpenMode": "Dialog"
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            var btn = view.context.controls['OpenViewButton'];

            // When
            btn.click();

            // Then
            var childView = view.context.controls['ChildView'];
            var viewIsOpened = childView.isLoaded();

            assert.isTrue(viewIsOpened);
            childView.close();

            done();
            view.close();
        });
    });

    it('should call onExecuted', function (done) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "Items": [{

                "Button": {
                    "Name": "OpenViewButton",
                    "Action": {
                        "OpenAction": {
                            "OnExecuted": "{ window.onExecutedWasCalled = true; }",
                            "LinkView": {
                                "InlineView": {
                                    "View": {
                                        "Text": "Child View",
                                        "Name": "ChildView"
                                    },
                                    "OpenMode": "Dialog"
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata(metadata, function(view){
            var btn = view.context.controls['OpenViewButton'];

            assert.isUndefined(window.onExecutedWasCalled);

            // When
            btn.click();

            // Then
            assert.isTrue(window.onExecutedWasCalled);

            done();

            // cleanup
            window.onExecutedWasCalled = undefined;
            view.close();
        });
    });
});