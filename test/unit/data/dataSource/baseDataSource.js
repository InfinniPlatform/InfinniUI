describe('baseDataSource', function () {

    it('should check ErrorValidator before save', function (done) {
        // Given
        var dataSource = new InfinniUI.ObjectDataSource( {view: fakeView()} );

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
        var dataSource = new InfinniUI.ObjectDataSource( {view: fakeView()} );

        dataSource.onErrorValidator(function(){
            //Then
            done();
        });

        //When
        dataSource.validateOnErrors();
    });

    it('should call suspended onSuccess callback if resumed update was success', function () {
        // Given
        var dataSource = new InfinniUI.ObjectDataSource( {view: fakeView()} );
        window.suspendedOnSuccessWasCalled = false;
        window.suspendedOnErrorWasCalled = false;

        // When
        dataSource.suspendUpdate();
        dataSource.updateItems(
            function(){ // onSuccess
                window.suspendedOnSuccessWasCalled = true;
            },
            function(){ // onError
                window.suspendedOnErrorWasCalled = true;
            });
        dataSource.resumeUpdate();

        // Then
        assert.isTrue(window.suspendedOnSuccessWasCalled);
        assert.isFalse(window.suspendedOnErrorWasCalled);
    });

    it('should call suspended onError callback if resumed update was fail', function () {
        // Given
        window.InfinniUI.providerRegister.register('DocumentDataSource', function(){
            return {
                getItems: function(successHandler, errorHandler){
                    errorHandler();
                },
                setOrigin: function(){},
                setPath: function(){},
                setData: function(){},
                setMethod: function(){}
            }
        });

        var dataSource = new InfinniUI.DocumentDataSource( { view: fakeView() } );

        window.suspendedOnSuccessWasCalled = false;
        window.suspendedOnErrorWasCalled = false;

        // When
        dataSource.suspendUpdate();
        dataSource.updateItems(
            function(){ // onSuccess
                window.suspendedOnSuccessWasCalled = true;
            },
            function(){ // onError
                window.suspendedOnErrorWasCalled = true;
            });
        dataSource.resumeUpdate();

        // Then
        assert.isFalse(window.suspendedOnSuccessWasCalled);
        assert.isTrue(window.suspendedOnErrorWasCalled);
    });
});
