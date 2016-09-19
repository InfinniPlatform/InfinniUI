describe('PanelControl', function () {

    describe('render', function () {
        it('Should render StackPanel with 4 Panel as ItemTemplate', function () {
            // Given
            var metadata = {
                "DataSources": [
                    {
                        "ObjectDataSource": {
                            "Name": "BloodGroupDataSource",
                            "Items": [
                                {
                                    "Id": 1,
                                    "DisplayName": "I",
                                    "SomeField": ""
                                },
                                {
                                    "Id": 2,
                                    "DisplayName": "II",
                                    "SomeField": "val"
                                },
                                {
                                    "Id": 3,
                                    "DisplayName": "III",
                                    "SomeField": 3
                                },
                                {
                                    "Id": 4,
                                    "DisplayName": "IV",
                                    "SomeField": null
                                }
                            ]
                        }
                    }
                ],
                "Items": [
                    {
                        "StackPanel": {
                            "Name": "StackPanel_1",
                            "Items": {
                                "Source": "BloodGroupDataSource",
                                "Property": ""
                            },
                            "ItemTemplate": {
                                "Panel": {
                                    "Collapsible": true,
                                    "Header": {
                                        "Source": "BloodGroupDataSource",
                                        "Property": "#.DisplayName"
                                    },
                                    "Items": [
                                        {
                                            "Label": {
                                                "Text": {
                                                    "Source": "BloodGroupDataSource",
                                                    "Property": "#.Id"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "Scripts": [
                    {
                        "Name": "OnExpanded",
                        "Body": "console.log('OnExpanded');"
                    },
                    {
                        "Name": "OnCollapsed",
                        "Body": "console.log('OnCollapsed');"
                    },
                    {
                        "Name": "OnExpanding",
                        "Body": "console.log('OnExpanding');"
                    },
                    {
                        "Name": "OnCollapsing",
                        "Body": "console.log('OnCollapsing');"
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $panels = $layout.find('.pl-panel');


                assert.equal($panels.length, 4);

                $panels.each(function (index, el) {
                    var $el = $(el),
                        $header = $el.find('.pl-panel-header'),
                        $body = $el.find('.pl-panel-body'),
                        header = $header.find('.pl-label').text(),
                        body = $body.find('.pl-label').text();

                    assert.isTrue($header.hasClass('pl-collapsible'));
                    assert.isFalse($header.hasClass('pl-collapsed'));
                    switch (index) {
                        case 0:
                            assert.equal(header, 'I');
                            assert.equal(body, '1');
                            break;
                        case 1:
                            assert.equal(header, 'II');
                            assert.equal(body, '2');
                            break;
                        case 2:
                            assert.equal(header, 'III');
                            assert.equal(body, '3');
                            break;
                        case 3:
                            assert.equal(header, 'IV');
                            assert.equal(body, '4');
                            $header.click();
                            assert.isTrue($header.hasClass('pl-collapsed'), 'collapse on click');
                            break;
                    }

                });

            }
        });

        it('Should render Panel with 3 items(as label)', function () {
            // Given
            var metadata = {
                "Items": [
                    {
                        "Panel": {
                            "Collapsible": true,
                            "Collapsed": true,
                            "Header": "Header",
                            "Items": [
                                {
                                    "Label": {
                                        "Text": "One"
                                    }
                                },
                                {
                                    "Label": {
                                        "Text": "Two"
                                    }
                                },
                                {
                                    "Label": {
                                        "Text": "Three"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "Scripts": [
                    {
                        "Name": "OnExpanded",
                        "Body": "console.log('OnExpanded');"
                    },
                    {
                        "Name": "OnCollapsed",
                        "Body": "console.log('OnCollapsed');"
                    },
                    {
                        "Name": "OnExpanding",
                        "Body": "console.log('OnExpanding');"
                    },
                    {
                        "Name": "OnCollapsing",
                        "Body": "console.log('OnCollapsing');"
                    }
                ]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout) {
                $layout.detach();
                var $panel = $layout.find('.pl-panel'),
                    $header = $panel.find('.pl-panel-header'),
                    $body = $panel.find('.pl-panel-body'),
                    header = $header.find('.pl-label').text(),
                    $items = $body.find('.pl-panel-i');


                assert.equal($items.length, 3);
                assert.isTrue($header.hasClass('pl-collapsible'));
                assert.isTrue($header.hasClass('pl-collapsed'));
                $items.each(function (index, el) {
                    var text = $('.pl-label', el).text();

                    switch(index) {
                        case 0:
                            assert.equal(text, 'One');
                            break;
                        case 1:
                            assert.equal(text, 'Two');
                            break;
                        case 2:
                            assert.equal(text, 'Three');
                            break;
                    }
                });

            }
        });
    });

    it('Should hide header if it is empty', function () {
        // Given
        var metadata = {
            "Items": [
                {
                    "Panel": {
                        "Name": "TestPanel",
                        "Header": "TestPanel"
                    }
                }
            ]
        };

        testHelper.applyViewMetadata(metadata, onViewReady);

        function onViewReady(view, $view) {
            $view.detach();

            var panel = view.context.controls['TestPanel'],
                $panel = $view.find('.pl-panel'),
                $panelHeader = $panel.find('.pl-panel-header');

            assert.notEqual($panelHeader.css('display'), 'none');

            // When
            panel.setHeader(null);

            // Then
            assert.equal($panelHeader.css('display'), 'none');
        }
    });
});