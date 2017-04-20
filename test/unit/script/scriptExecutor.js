describe( 'ScriptExecutor', function() {

    it( 'should build script handler', function() {
        // Given
        var builder = new InfinniUI.ScriptBuilder();
        var metadata = {
            Name: 'Name',
            Body: 'return 5;'
        };

        // When
        var func = builder.build( null, { metadata: metadata } );

        // Then
        assert.equal( func.call(), 5 );
    } );

    it( 'should pass arguments to handler', function() {
        // Given
        var builder = new InfinniUI.ScriptBuilder();
        var metadata = {
            Name: 'Name',
            Body: 'return [context,args].join(\':\');'
        };

        // When
        var func = builder.build( null, { metadata: metadata } );

        // Then
        assert.equal( func.call( undefined, 'Context', 'Args' ), 'Context:Args' );
    } );

    it( 'should execute script by name', function( done ) {
        var metadata = {
            Scripts: [
                {
                    Name: 'TestScript',
                    Body: 'window.testScriptWasExecuted = true;'
                }
            ]
        };

        var onViewReady = function( view ) {
            // Given
            window.testScriptWasExecuted = false;

            //When
            new window.InfinniUI.ScriptExecutor( view ).executeScript( 'TestScript' );

            //Then
            assert.isTrue( window.testScriptWasExecuted );
            done();
        };

        testHelper.applyViewMetadata( metadata, onViewReady );
    } );
} );
