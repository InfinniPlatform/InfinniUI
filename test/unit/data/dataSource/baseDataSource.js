describe('baseDataSource', function () {

    it('should check ErrorValidator before save', function (done) {
        // Given
        var dataSource = new ObjectDataSource( {view: fakeView()} );

        dataSource.setErrorValidator(function(context, args) {
            return {
                IsValid: false
            }
        });

        dataSource.createItem(function(context, args){
            //When
            var item = args.value;

            dataSource.saveItem(item,
                function(){ assert.fail("success", "error", "success save invalid item"); },
                // Then
                function(){ done(); })
        });
    });

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