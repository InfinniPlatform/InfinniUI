describe('baseDataSource', function () {

    it('should call onWarningValidator handlers after validateOnWarnings', function (done) {
        // Given
        var dataSource = new ObjectDataSource( {view: fakeView()} );

        dataSource.onWarningValidator(function(){
            //Then
            done();
        });

        dataSource.onErrorValidator(function(){
            assert.fail("onErrorValidator", "onWarningValidator", "validateOnWarnings call onErrorValidator");
        });

        //When
        dataSource.validateOnWarnings();
    });

    it('should call onErrorValidator handlers after validateOnErrors', function (done) {
        // Given
        var dataSource = new ObjectDataSource( {view: fakeView()} );

        dataSource.onWarningValidator(function(){
            assert.fail("onWarningValidator", "onErrorValidator", "validateOnErrors call onWarningValidator");
        });
        dataSource.onErrorValidator(function(){
            //Then
            done();
        });

        //When
        dataSource.validateOnErrors();
    });
});