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

    it('should call onErrorValidator handlers after validateOnErrors', function (done) {
        // Given
        var dataSource = new ObjectDataSource( {view: fakeView()} );

        dataSource.onErrorValidator(function(){
            //Then
            done();
        });

        //When
        dataSource.validateOnErrors();
    });
});