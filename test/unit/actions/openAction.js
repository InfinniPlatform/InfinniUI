describe('OpenAction', function () {
    it('successful build', function () {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
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

    it('should open view after confirmation received', function (done) {
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
                            },
                            "CanExecute": "{ return window.actionCanExecute( context, args ); }"
                        }
                    }
                }
            }]
        };

        window.actionCanExecute = function( context, args ) {
            return new Promise( function( resolve, reject ) {
                setTimeout( function() {
                    resolve( true );
                }, 10);
            } );
        };

        testHelper.applyViewMetadata(metadata, function( view ){
            var btn = view.context.controls['OpenViewButton'];

            // When
            btn.click();

            var childView = view.context.controls[ 'ChildView' ];
            assert.isUndefined( childView );

            setTimeout( function() {
                // Then
                childView = view.context.controls[ 'ChildView' ];
                var viewIsOpened = childView.isLoaded();

                assert.isTrue( viewIsOpened );
                childView.close();

                done();
                view.close();

            }, 50 );
        });
    });

});
