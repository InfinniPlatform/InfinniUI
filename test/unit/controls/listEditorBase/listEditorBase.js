describe('ListEditorBase (Control)', function () {

    function applyViewMetadata(metadata, onViewReady){
        var linkView = new LinkView(null, function (resultCallback) {
            var builder = new ApplicationBuilder();
            var view = builder.buildType('View', metadata, {parentView: fakeView()});
            resultCallback(view);
        });
        linkView.setOpenMode('Application');

        var view = linkView.createView(function (view) {
            view.open();
            onViewReady(view, $('#sandbox').children());
        });
    }



    describe('ListBox as exemplar of ListEditorBase', function (){

        it('should apply value to control (single selecting mode)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": { "Id": 2, "Display": "2G" }}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                assert.lengthOf($chosen, 1, 'length of chosen item is right');
                assert.equal($items.index($chosen), 1, 'index of chosen item is right');
            }
        });


        it('should apply value to control (multiply selecting mode)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": [
                                    { "Id": 2, "Display": "2G" },
                                    {"Id": 3, "Display": "2G"}
                                ]}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "MultiSelect": true,
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                //$layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                assert.lengthOf($chosen, 2, 'length of chosen item is right');
                assert.equal($items.index($chosen.eq(0)), 1, 'index of first chosen item is right');
                assert.equal($items.index($chosen.eq(1)), 2, 'index of second chosen item is right');
            }
        });
    });


});