describe('ComboBox', function () {
    describe('render', function () {

        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var comboBox = new ComboBox(), $el, $control;

            $el = comboBox.render();

            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($el.hasClass('hidden'), 'hidden');
            assert.isFalse($el.hasClass('pull-left'), 'pull-left');

            // When
            comboBox.setName('newName');
            comboBox.setEnabled(false);
            comboBox.setVisible(false);
            
            // Then

            assert.equal($el.attr('data-pl-name'), 'newName');

            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pull-left'));
        });

        it('Events onLoad, onValueChanged', function () {
            // Given
            var comboBox = new ComboBox(),
                onLoadFlag = 0,
                onValueChanged = 0;

            comboBox.onLoaded(function(){
                onLoadFlag++;
            });
            comboBox.onValueChanged(function(){
                onValueChanged++;
            });

            assert.equal(onLoadFlag, 0);
            assert.equal(onValueChanged, 0);

            // When
            comboBox.render();
            comboBox.setValue('new');

            // Then
            assert.equal(onLoadFlag, 1);
            assert.equal(onValueChanged, 1);
        });

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
                                    "Property": "#.Display"
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');


                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.length, 1);
                assert.equal($value.find('.pl-label').text(), '2 - 2G');
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
                                    "Property": "#.Display"
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.pl-label').text(), '2 - 2G3 - 3G');
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
                                    "Property": "#.Display"
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.pl-label').text(), '2G2');
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
                                    "Property": "#.Display"
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
                                                "Property": "Value.#.Display"
                                            }
                                        }
                                    },
                                    {
                                        "Label": {
                                            "HorizontalAlignment": "Left",
                                            "Value": {
                                                "Source": "ObjectDataSource2",
                                                "Property": "Value.#.Id"
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $label = $layout.find('.pl-combobox > .pl-control-label'),
                    $value = $layout.find('.pl-combobox__value');

                assert.equal($label.text(), 'Combobox Label');
                assert.equal($value.find('.pl-label').text(), '2G23G3');
            }
        });

    });

    describe('api', function () {
        it('should update DisabledItemCondition', function (done) {
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
                                {"Id": 1, "Display": "LTE", "Type": 1},
                                {"Id": 2, "Display": "2G", "Type": 2},
                                {"Id": 3, "Display": "3G", "Type": 2}
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
                        "Name": "ComboBox1",
                        "LabelText": "Combobox Label",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Display"
                                }
                            }
                        },
                        "ValueProperty": "Display",
                        "Items": {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        },
                        "GroupItemTemplate": {
                            "Label": {
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Type"
                                },
                                "TextHorizontalAlignment": "Center"
                            }
                        },
                        "GroupValueProperty": "Type",
                        "DisabledItemCondition": "{ return (args.value.Id == 2); }",
                        "Value": {
                            "Source": "ObjectDataSource2",
                            "Property": "Value"
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                var combobox = view.context.controls['ComboBox1'];
                var $value = $layout.find('.pl-combobox__value');

                $value.click();

                var items = $('.pl-combobox-group__items .pl-label');
                assert.isFalse(items.eq(0).hasClass('pl-disabled-list-item'), 'bad render for enabled item');
                assert.isTrue(items.eq(1).hasClass('pl-disabled-list-item'), 'bad render for disabled item');

                // When
                combobox.setDisabledItemCondition(function (context, args) {
                        return args.value.Id == 1;
                });
                $value.click();

                // Then
                var items = $('.pl-combobox-group__items .pl-label');
                assert.isTrue(items.eq(0).hasClass('pl-disabled-list-item'), 'items not updated');
                assert.isFalse(items.eq(1).hasClass('pl-disabled-list-item'), 'items not updated');

                done();
                view.close();
            }
        });
    });


});
