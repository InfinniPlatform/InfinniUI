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

        it('should render listBox without grouping', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                { "Id": 1, "Display": "LTE" },
                                { "Id": 2, "Display": "2G" },
                                { "Id": 3, "Display": "2G" }
                            ]
                        },

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
                                "Property": "$"
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

                assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox');
                assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            }
        });

    });

    it('should render listBox with grouping (with template group title)', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "LTE" },
                            { "Id": 2, "Display": "2G" },
                            { "Id": 3, "Display": "2G" }
                        ]
                    }
                }
            ],
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    "Items" : [
                        {
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
                                "GroupItemTemplate": {
                                    "Label": {
                                        "Value": {
                                            "PropertyBinding":{
                                                "Source": "ObjectDataSource1",
                                                "Property": "$.Display"
                                            }
                                        }
                                    }
                                },
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "PropertyBinding": {
                                        "Source": "ObjectDataSource1",
                                        "Property": ""
                                    }
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox is right');
            assert.lengthOf($layout.find('.pl-listbox-group-i'), 2, 'length of rendered group is right');
            assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            assert.equal($.trim( $layout.find('.pl-listbox-group-title').last().text() ), '2G', 'group value in template is right');
        }
    });


    it('should render listBox with grouping (with format group title)', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "LTE" },
                            { "Id": 2, "Display": "2G" },
                            { "Id": 3, "Display": "2G" }
                        ]
                    }
                }
            ],
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    "Items" : [
                        {
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
                                "GroupItemFormat": "Connect: {Display}",
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "PropertyBinding": {
                                        "Source": "ObjectDataSource1",
                                        "Property": ""
                                    }
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox is right');
            assert.lengthOf($layout.find('.pl-listbox-group-i'), 2, 'length of rendered group is right');
            assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            assert.equal($.trim( $layout.find('.pl-listbox-group-title').last().text() ), 'Connect: 2G', 'group value in template is right');
        }
    });
});