//describe('EditAction', function () {
//    it('successful build', function () {
//        // Given
//        var view = new View();
//        var builder = new ApplicationBuilder();
//        var dataSource = new ObjectDataSource({ name: 'SomeDS', view: view });
//
//        dataSource.setItems([{Id:1},{Id:2}]);
//
//        view.getDataSources().push(dataSource);
//
//        var metadata = {
//            StackPanel: {
//                Items: {
//                    Source: "SomeDS",
//                    Property: ""
//                },
//                ItemTemplate: {
//                    Button: {
//                        Name: "EditButton",
//                        Action:{
//                            EditAction: {
//                                LinkView: {
//                                    InlineView: {
//
//                                    }
//                                },
//                                DestinationValue: {
//                                    Source: 'SomeDS'
//                                },
//                                SourceValue: {
//                                    Source: 'EditDS'
//                                }
//                            }
//                        }
//
//                    }
//                }
//            }
//
//        };
//
//        // When
//        var stackPanel = builder.build(metadata, {parentView: view});
//        debugger;
//
//        // Then
//        //assert.isNotNull( editAction );
//        //assert.isNotNull( editAction.execute, 'action should have execute' );
//    });
//
//});