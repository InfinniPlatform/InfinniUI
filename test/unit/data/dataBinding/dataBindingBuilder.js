describe('DataBindingBuilder', function () {
    function applyViewMetadata(metadata, onViewReady){
        metadata = {
            View: metadata
        };

        var appBuilder = new ApplicationBuilder();
        var linkView = (new InlineViewBuilder()).build(null, {builder: appBuilder, metadata: metadata});

        var view = linkView.createView(function (view) {
            view.open();
            onViewReady(view, $('#sandbox').children());
        });
    }


    it('should build DataBinding', function () {
        // Given
        var dataBindingBuilder = new DataBindingBuilder();
        var view = {
            getContext: function(){
                return {
                    dataSources: {
                        My_Source: {
                            onPropertyChanged: function(){}
                        }
                    },
                    parameters: {
                    },
                    controls: {
                    }
                };
            }
        };
        var metadata = {
            Source: 'My_Source',
            Property: '',
            Mode: 'ToSource',
            Converter: {
                toSource: function(){},
                toElement: function(){}
            }
        };

        // When
        var dataBinding = dataBindingBuilder.build(null, {parentView: view, metadata: metadata});

        // Then
        assert.equal(dataBinding.getMode(), BindingModes.toSource);
        assert.isNotNull(dataBinding.getConverter());
        assert.isNotNull(dataBinding.getSource());
        assert.isNotNull(dataBinding.getSourceProperty());
    });

    it('should bind all type of source', function () {
        // Given
        var dataBindingBuilder = new DataBindingBuilder();
        var view = {
            getContext: function(){
                return {
                    dataSources: {
                        My_DataSource: {
                            onPropertyChanged: function(){}
                        }
                    },
                    parameters: {
                        My_Parameter: {
                            onPropertyChanged: function(){}
                        }
                    },
                    controls: {
                        My_Button: {
                            onPropertyChanged: function(){}
                        }
                    }
                };
            }
        };

        // Then
        dataBindingBuilder.build(null, { parentView: view, metadata: { Source: 'My_DataSource'} });
        dataBindingBuilder.build(null, { parentView: view,  metadata: { Source: 'My_Parameter'} });
        dataBindingBuilder.build(null, { parentView: view,  metadata: { Source: 'My_Button'} });
    });

    it('should toElement converter work in inline style', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "LTE" },
                            { "Id": 2, "Display": "3G" },
                            { "Id": 3, "Display": "2G" }
                        ]
                    }
                }
            ],
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    "ItemTemplate": {
                        "TextBox": {
                            "Name": "TextBox1",
                            "Value": {
                                "Source": "ObjectDataSource1",
                                "Property": "#.Display",
                                "Converter": {
                                    "ToElement": "{return args.value + '!';}"
                                }
                            }
                        }
                    },
                    "Items" : {
                        "Source": "ObjectDataSource1",
                        "Property": ""
                    }
                }
            }]
        };

        // When
        applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE!', 'binding in itemTemplate is right');
        }
    });
});
