describe('SelectAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();

        var metadata = {
            SelectAction: {
                LinkView: {
                    ExistsView: {
                    }
                },
                SourceValue: {
                    Source: 'FirstDS',
                    Property: 'Name'
                },
                DestinationValue: {
                    Source: 'SecondDS',
                    Property: 'Name'
                }
            }
        };

        // When
        var selectAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( selectAction );
        assert.isNotNull( selectAction.execute, 'action should have execute' );
    });
});