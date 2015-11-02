describe('ComboBox', function () {

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



    describe('render', function (){

        it('debug', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE", "State": "New"},
                                {"Id": 2, "Display": "2G", "State": "Deprecated"},
                                {"Id": 3, "Display": "3G", "State": "Deprecated"}
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

                    ComboBox: {
                        "ItemTemplate": {
                            "Label": {
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
                                        "Property": "$.State"
                                    }
                                }
                            }
                        },
                        "~GroupValueProperty": "State",
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "ValueProperty": "Id",
                        "MultiSelect": true,
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

                //var $items = $layout.find('.pl-listbox-i'),
                //    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                //assert.lengthOf($chosen, 1, 'length of chosen item is right');
                //assert.equal($items.index($chosen), 1, 'index of chosen item is right');
            }
        });

    });

});