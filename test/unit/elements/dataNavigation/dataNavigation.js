describe('DataNavigation', function () {
    it('should pass test default property', function () {
        // Given
        var metadata = {
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "PatientDataSource",
                        "Items": [
                            {"Id": 1, "Display": "LTE", "State": "New"},
                            {"Id": 2, "Display": "2G", "State": "Deprecated"},
                            {"Id": 3, "Display": "3G", "State": "Deprecated"}
                        ]
                    }
                }
            ],
            Items: [{

                DataNavigation: {
                    Enabled: true,
                    Name: "DataNavigation1",
                    AvailablePageSizes: [ 20, 50, 100 ],
                    DataSource: "PatientDataSource"
                }
            }]
        };

        // When
        testHelper.applyViewMetadata(metadata, onDataNavigationReady);

        // Then
        function onDataNavigationReady(view, $view){
            var dataNavigation = view.context.controls['DataNavigation1'];

            assert.isDefined(dataNavigation);
            assert.isTrue(dataNavigation.getEnabled());
            assert.isTrue(dataNavigation.getVisible());
            assert.equal(dataNavigation.getHorizontalAlignment(), 'Stretch');
            assert.equal(dataNavigation.getDataSource().name, "PatientDataSource");

            view.close();
        }
    });

    it('should call onPageNumberChanged', function (done) {
        // Given
        var dataNavigation = new DataNavigation();

        dataNavigation.onPageNumberChanged(function(){
            // Then
            done();
        });

        // When
        dataNavigation.setPageNumber(1);
    });

    it('should call onPageSizeChanged', function (done) {
        // Given
        var dataNavigation = new DataNavigation();

        dataNavigation.onPageSizeChanged(function(){
            // Then
            done();
        });

        // When
        dataNavigation.setPageSize(1);
    });
});