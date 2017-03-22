describe( 'CreateItemAction', function() {

    it( 'successful build', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = new InfinniUI.ObjectDataSource( {name: 'SomeDS', view: view} );

        view.getDataSources().push( dataSource );

        var metadata = {
            CreateItemAction: {
                DestinationValue: {
                    Source: 'SomeDS'
                }
            }
        };

        // When
        var createItemAction = builder.build( metadata, {parentView: view} );

        // Then
        assert.isNotNull( createItemAction );
        assert.isNotNull( createItemAction.execute, 'action should have execute' );
    } );

    it( 'should create item in ObjectDataSource', function( done ) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "Items": []
                    }
                }
            ],
            "Items": [
                {
                    "Button": {
                        "Name": "CreateItemButton",
                        "Action": {
                            "CreateItemAction": {
                                "DestinationValue": {
                                    "Source": "ObjectDataSource"
                                }
                            }
                        }
                    }
                }
            ]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var createItemBtn = view.context.controls['CreateItemButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal( destinationDS.getItems().length, 0 );

            // When
            createItemBtn.click();

            // Then

            assert.equal( destinationDS.getItems().length, 1 );
            done();

            // cleanup
            view.close();


        } );
    } );

    it( 'should create item in ObjectDataSource\'s item property', function( done ) {
        // Given
        var metadata = {
            "Text": 'Parent View',
            "DataSources": [
                {
                    "ObjectDataSource": {
                        "Name": "ObjectDataSource",
                        "Items": [
                            {
                                "_id": 1,
                                "name": "Name",
                                "items": []
                            }
                        ]
                    }
                }
            ],
            "Items": [{
                "Button": {
                    "Name": "CreateItemButton",
                    "Action": {
                        "CreateItemAction": {
                            "DestinationValue": {
                                "Source": "ObjectDataSource",
                                "Property": "0.items"
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var createItemBtn = view.context.controls['CreateItemButton'];
            var destinationDS = view.context.dataSources['ObjectDataSource'];

            assert.equal( destinationDS.getItems()[0].items.length, 0 );

            // When
            createItemBtn.click();

            // Then
            assert.equal( destinationDS.getItems()[0].items.length, 1 );

            done();

            // cleanup
            view.close();
        } );
    } );

} );