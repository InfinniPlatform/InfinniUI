describe('ComboBox', function () {

    function applyViewMetadata(metadata, onViewReady) {
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


    describe('render', function () {

        it('ValueSelector', function () {
            // Given
            var metadata = {
                "Text": 'Пациенты',
                "Scripts": [
                    {
                        "Name": "ValueSelector1",
                        "Body": "return {Id: args.value.Id, DisplayName: args.value.Display};"
                    }
                ],
                "DataSources": [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE", "State": "New"},
                                {"Id": 2, "Display": "2G", "State": "Deprecated"},
                                {"Id": 3, "Display": "3G", "State": "Deprecated"}
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                {"Value": {"Id": 2, "DisplayName": "2G"}}
                            ]
                        }
                    }
                ],
                "Items": [{

                    ComboBox: {
                        "LabelText": "Combobox Label",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "$.Display"
                                }
                            }
                        },
                        "Items": {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        },
                        "ValueSelector": "ValueSelector1",
                        "ValueFormat": "{Id} - {DisplayName}",
                        "MultiSelect": false,
                        "Value": {
                            "Source": "ObjectDataSource2",
                            "Property": "Value"
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');


                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.length, 1);
                assert.equal($value.find('.label-control').text(), '2 - 2G');
            }
        });

        it('ValueSelector multiselect', function () {
            // Given
            var metadata = {
                "Text": 'Пациенты',
                "Scripts": [
                    {
                        "Name": "ValueSelector1",
                        "Body": "return {Id: args.value.Id, DisplayName: args.value.Display};"
                    }
                ],
                "DataSources": [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE", "State": "New"},
                                {"Id": 2, "Display": "2G", "State": "Deprecated"},
                                {"Id": 3, "Display": "3G", "State": "Deprecated"}
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                {"Value": [
                                    {"Id": 2, "DisplayName": "2G"},
                                    {"Id": 3, "DisplayName": "3G"}
                                ]}
                            ]
                        }
                    }
                ],
                "Items": [{

                    ComboBox: {
                        "LabelText": "Combobox Label",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "$.Display"
                                }
                            }
                        },
                        "Items": {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        },
                        "ValueSelector": "ValueSelector1",
                        "ValueFormat": "{Id} - {DisplayName}",
                        "MultiSelect": true,
                        "Value": {
                            "Source": "ObjectDataSource2",
                            "Property": "Value"
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.label-control').text(), '2 - 2G3 - 3G');
            }
        });

        it('ValueTemplate', function () {
            // Given
            var metadata = {
                "Text": 'Пациенты',
                "DataSources": [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE", "State": "New"},
                                {"Id": 2, "Display": "2G", "State": "Deprecated"},
                                {"Id": 3, "Display": "3G", "State": "Deprecated"}
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                {"Value": {"Id": 2, "Display": "2G","State": "Deprecated"}}
                            ]
                        }
                    }
                ],
                "Items": [{

                    ComboBox: {
                        "LabelText": "Combobox Label",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "$.Display"
                                }
                            }
                        },
                        "Items": {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        },
                        "ValueTemplate": {
                            "StackPanel": {
                                "Orientation": "Horizontal",
                                "Items": [
                                    {
                                        "Label": {
                                            "HorizontalAlignment": "Left",
                                            "Value": {
                                                "Source": "ObjectDataSource2",
                                                "Property": "$.Value.Display"
                                            }
                                        }
                                    },
                                    {
                                        "Label": {
                                            "HorizontalAlignment": "Left",
                                            "Value": {
                                                "Source": "ObjectDataSource2",
                                                "Property": "$.Value.Id"
                                            }
                                        }
                                    }
                                ]
                            }

                        },
                        "MultiSelect": false,
                        "Value": {
                            "Source": "ObjectDataSource2",
                            "Property": "$.Value"
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.label-control').text(), '2G2');
            }
        });

        it('ValueTemplate multiselect', function () {
            // Given
            var metadata = {
                "Text": 'Пациенты',
                "DataSources": [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE", "State": "New"},
                                {"Id": 2, "Display": "2G", "State": "Deprecated"},
                                {"Id": 3, "Display": "3G", "State": "Deprecated"}
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                {"Value": [
                                    {"Id": 2, "Display": "2G","State": "Deprecated"},
                                    {"Id": 3, "Display": "3G", "State": "Deprecated"}
                                ]}
                            ]
                        }
                    }
                ],
                "Items": [{

                    ComboBox: {
                        "LabelText": "Combobox Label",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "$.Display"
                                }
                            }
                        },
                        "Items": {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        },
                        "ValueTemplate": {
                            "StackPanel": {
                                "Orientation": "Horizontal",
                                "Items": [
                                    {
                                        "Label": {
                                            "HorizontalAlignment": "Left",
                                            "Value": {
                                                "Source": "ObjectDataSource2",
                                                "Property": "Value.$.Display"
                                            }
                                        }
                                    },
                                    {
                                        "Label": {
                                            "HorizontalAlignment": "Left",
                                            "Value": {
                                                "Source": "ObjectDataSource2",
                                                "Property": "Value.$.Id"
                                            }
                                        }
                                    }
                                ]
                            }

                        },
                        "MultiSelect": true,
                        "Value": {
                            "Source": "ObjectDataSource2",
                            "Property": "$.Value"
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.label-control').text(), '2G23G3');
            }
        });

        //it('debug', function () {
        //    // Given
        //    var metadata = {
        //        "Text": 'Пациенты',
        //        "Scripts": [
        //            {
        //                "Name": "ValueSelector1",
        //                "Body": "return typeof args.value === 'undefined' ? null : {Id: args.value.Id, DisplayName: args.value.Display};"
        //            }
        //        ],
        //        "DataSources": [
        //            {
        //                ObjectDataSource: {
        //                    "Name": "ObjectDataSource1",
        //                    "Items": [
        //                        {"Id": 1, "Display": "LTE", "State": "New"},
        //                        {"Id": 2, "Display": "2G", "State": "Deprecated"},
        //                        {"Id": 3, "Display": "3G", "State": "Deprecated"}
        //                    ]
        //                }
        //            }, {
        //                ObjectDataSource: {
        //                    "Name": "ObjectDataSource2",
        //                    "~Items": [
        //                        {"Value": [{"Id": 2, "DisplayName": "2G"}]}
        //                    ],
        //                    "Items": [
        //                        {"Value": {"Id": 2, "DisplayName": "2G"}}
        //                    ]
        //                }
        //            }
        //        ],
        //        "Items": [{
        //
        //            ComboBox: {
        //                "~LabelText": "Combobox Label",
        //                "ItemTemplate": {
        //                    "Label": {
        //                        "Name": "TextBox1",
        //                        "Value": {
        //                            "PropertyBinding": {
        //                                "Source": "ObjectDataSource1",
        //                                "Property": "$.Display"
        //                            }
        //                        }
        //                    }
        //                },
        //                "GroupItemTemplate": {
        //                    "Label": {
        //                        "Value": {
        //                            "PropertyBinding": {
        //                                "Source": "ObjectDataSource1",
        //                                "Property": "$.State"
        //                            }
        //                        }
        //                    }
        //                },
        //                "~GroupValueProperty": "State",
        //                "Items": {
        //                    "PropertyBinding": {
        //                        "Source": "ObjectDataSource1",
        //                        "Property": ""
        //                    }
        //                },
        //                "ValueSelector": "ValueSelector1",
        //                "~ValueProperty": "DisplayName",
        //                "ValueFormat": "{Id} - {DisplayName}",
        //                "~ValueTemplate": {
        //                    "StackPanel": {
        //                        "Orientation": "Horizontal",
        //                        "Items": [
        //                            {
        //                                "Label": {
        //                                    "HorizontalAlignment": "Left",
        //                                    "Value": {
        //                                        "PropertyBinding": {
        //                                            "Source": "ObjectDataSource2",
        //                                            "Property": "Value.$.Display"
        //                                        }
        //                                    }
        //                                }
        //                            },
        //                            {
        //                                "Label": {
        //                                    "HorizontalAlignment": "Left",
        //                                    "Value": {
        //                                        "PropertyBinding": {
        //                                            "Source": "ObjectDataSource2",
        //                                            "Property": "Value.$.Id"
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        ]
        //                    }
        //
        //                },
        //                "MultiSelect": false,
        //                "Value": {
        //                    "PropertyBinding": {
        //                        "Source": "ObjectDataSource2",
        //                        "Property": "$.Value"
        //                    }
        //                }
        //            }
        //        }]
        //    };
        //
        //
        //    // When
        //    applyViewMetadata(metadata, onViewReady);
        //
        //    // Then
        //    function onViewReady(view, $layout) {
        //        //$layout.detach();
        //
        //        //var $items = $layout.find('.pl-listbox-i'),
        //        //    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');
        //
        //        //assert.lengthOf($chosen, 1, 'length of chosen item is right');
        //        //assert.equal($items.index($chosen), 1, 'index of chosen item is right');
        //    }
        //});

    });

});