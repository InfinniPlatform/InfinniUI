describe( 'TreeModel', function() {

    describe( 'TreeModel', function() {
        it( 'Simple handling', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = '';

            treeModel.onPropertyChanged( 'p1', function( context, args ) {
                result = result + '1';

                assert.equal( context, 'context', 'passed context argument is right' );
                assert.isNull( args.oldValue, 'old value is right' );
                assert.equal( args.newValue, 1, 'new value is right' );

                assert.equal( treeModel.getProperty( 'p1' ), 1, 'value was saved before handling' );
            } );

            //When
            treeModel.setProperty( 'p1', 1 );

            // Then
            assert.equal( result, '1', 'Handler was triggered' );
            assert.equal( treeModel.getProperty( 'p1' ), 1, 'Value was right saved' );
        } );


        it( 'Handling many handlers', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = '';

            treeModel.onPropertyChanged( 'p1', function( context, args ) {
                result = result + '1';

                assert.equal( context, 'context', 'passed context argument is right' );
                assert.isNull( args.oldValue, 'old value is right' );
                assert.equal( args.newValue, 1, 'new value is right' );
            } );

            treeModel.onPropertyChanged( 'p2', function( context, args ) {
                result = result + '2';
            } );

            //When
            treeModel.setProperty( 'p1', 1 );
            treeModel.setProperty( 'p2', 2 );
            treeModel.setProperty( 'p2', 3 );

            // Then
            assert.equal( result, '122', 'Handlers was triggered' );

            assert.equal( treeModel.getProperty( 'p1' ), 1, 'Value p1 was right saved' );
            assert.equal( treeModel.getProperty( 'p2' ), 3, 'Value p2 was right saved' );
        } );

        it( 'Handling deep sets', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = '';
            var jsonOfVal;

            treeModel.onPropertyChanged( 'p1.p11', function( context, args ) {
                result = result + '1';

                assert.isTrue( typeof args.oldValue === 'undefined' || args.oldValue == 1, 'old value is right' );
                assert.isTrue( args.newValue == 1 || args.newValue == 4, 'new value is right' );

                assert.isTrue( treeModel.getProperty( 'p1.p11' ) == 1 || treeModel.getProperty( 'p1.p11' ) == 4, 'value was saved before handling' );
            } );

            treeModel.onPropertyChanged( 'p1', function( context, args ) {
                result = result + '2';

                assert.equal( context, 'context', 'passed context argument is right' );

                jsonOfVal = JSON.stringify( args.oldValue );
                assert.equal( jsonOfVal, '{"p11":1}', 'old value is right' );
                jsonOfVal = JSON.stringify( args.newValue );
                assert.equal( jsonOfVal, '{"p11":4}', 'new value is right' );

                assert.equal( treeModel.getProperty( 'p1' ).p11, 4, 'value was saved before handling' );
            } );

            //When
            treeModel.setProperty( 'p1.p11', 1 );
            treeModel.setProperty( 'p2.p11', 3 );
            treeModel.setProperty( 'p2', 2 );
            treeModel.setProperty( 'p1', { p11: 4 } );

            // Then
            assert.equal( result, '121', 'Handler was triggered' );
            assert.equal( treeModel.getProperty( 'p1' ).p11, 4, 'value was saved before handling' );

            jsonOfVal = JSON.stringify( treeModel.getProperty( '' ) );
            assert.equal( jsonOfVal, '{"p1":{"p11":4},"p2":2}', 'full data tree is right' );
        } );

        it( 'Handling onChange, on all properties', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = [];
            var jsonOfVal;

            treeModel.onPropertyChanged( function( context, args ) {
                result.push( args.property );
            } );


            //When
            treeModel.setProperty( 'p1.p11', 1 );
            treeModel.setProperty( 'p2.p11', 3 );
            treeModel.setProperty( 'p2', 2 );
            treeModel.setProperty( 'p1', { p11: 4 } );

            // Then
            assert.equal( result.join( ',' ), 'p1.p11,p2.p11,p2,p1', 'Handler was right triggered' );
        } );

        it( 'Handling onChange of subtree', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = [];
            var jsonOfVal;

            treeModel.onPropertyChanged( '*', function( context, args ) {
                result.push( args.property );
            } );

            treeModel.onPropertyChanged( 'p1.*', function( context, args ) {
                result.push( args.property );
            } );


            //When
            treeModel.setProperty( 'p1.p11.p111', 1 );
            treeModel.setProperty( 'p2.p11', 3 );
            treeModel.setProperty( 'p2', 2 );
            treeModel.setProperty( 'p1', { p11: 4 } );

            // Then
            assert.equal( result.join( ',' ), 'p1.p11.p111,p1.p11.p111,p2.p11,p2,p1,p1', 'Handler was right triggered' );
        } );

        it( 'Auto unsubscribing if owner is checked as removed', function() {
            // Given
            var treeModel = new InfinniUI.TreeModel( 'context' );
            var result = '';
            var jsonOfVal;
            var owner1 = {
                    isRemoved: false
                }, owner2 = {
                    isRemoved: false
                };

            treeModel.onPropertyChanged( 'p1.p11', function( context, args ) {
                result = result + '1';

                assert.isTrue( typeof args.oldValue === 'undefined' || args.oldValue == 1 || args.oldValue == 2, 'old value is right' );
                assert.isTrue( args.newValue == 1 || args.newValue == 4 || args.newValue == 2 || args.newValue == 8, 'new value is right' );

            }, { owner: owner1 } );

            treeModel.onPropertyChanged( 'p1', function( context, args ) {

                result = result + '2';

            }, { owner: owner2 } );

            //When
            treeModel.setProperty( 'p1.p11', 1 );
            treeModel.setProperty( 'p2.p11', 3 );
            treeModel.setProperty( 'p2', 2 );
            treeModel.setProperty( 'p1', { p11: 4 } );

            owner1.isRemoved = true;

            treeModel.setProperty( 'p1.p11', 2 );
            treeModel.setProperty( 'p2.p11', 6 );
            treeModel.setProperty( 'p1', { p11: 8 } );

            // Then
            assert.equal( result, '1212', 'Handler was triggered' );
            assert.equal( treeModel.getProperty( 'p1' ).p11, 8, 'value was saved before handling' );

            jsonOfVal = JSON.stringify( treeModel.getProperty( '' ) );
            assert.equal( jsonOfVal, '{"p1":{"p11":8},"p2":{"p11":6}}', 'full data tree is right' );
        } );
    } );
} );
