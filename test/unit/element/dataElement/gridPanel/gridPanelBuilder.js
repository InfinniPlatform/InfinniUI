describe('GridPanelBuilder', function () {
    it('should build', function () {
        //Given
        var metadata = {
            "Rows": [
                {
                    "Cells": [
                        {
                            "ColumnSpan": 6,
                            "Items": [
                                {
                                    "Panel": {
                                        "Text": "Главное меню",
                                        "Name": "MainMenuPanel",
                                        "Items": [
                                            {
                                                "Button": {
                                                    "Name": "PatientsButton",
                                                    "Text": "Пациенты"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "ColumnSpan": 6,
                            "Items": [
                                {
                                    "Panel": {
                                        "Text": "Какой-нибудь виджет",
                                        "Name": "Widget1Panel",
                                        "Items": []
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "Cells": [
                        {
                            "ColumnSpan": 12,
                            "Items": [
                                {
                                    "Panel": {
                                        "Text": "И тут еще виджет",
                                        "Name": "Widget2Panel",
                                        "Items": []
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var applicationBuilder = new Builder();
        applicationBuilder.register('Panel', { build: function () {
            return 42;
        }});

        //Then
        var gridPanel = new GridPanelBuilder().build(null, {builder: applicationBuilder, view: fakeView(), metadata: metadata});

        //When
        assert.equal(gridPanel.getRows().length, 2);
        assert.equal(gridPanel.getRows()[0].getCells().length, 2);
        assert.equal(gridPanel.getRows()[1].getCells().length, 1);
        assert.equal(gridPanel.getRows()[0].getCells()[0].getItems().length, 1);
    });
});