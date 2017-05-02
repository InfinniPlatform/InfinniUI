describe( 'NumberFormatting', function() {
    describe( 'format', function() {
        it( 'successful build', function() {
            //Given
            var builder = new InfinniUI.NumberFormatBuilder();
            //When
            var format = builder.build( null, { metadata: {} } );
            //Then
            assert.isFunction( format.format );
            assert.equal( format.getFormat(), 'n' );
        } );

        it( 'should format percent', function() {
            //Given
            var formattingP = new InfinniUI.NumberFormat( 'p' );
            var formattingP0 = new InfinniUI.NumberFormat( 'p0' );
            var formattingP1 = new InfinniUI.NumberFormat( 'p1' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var val = 123.4567;

            //Then
            assert.equal( formattingP.format( val ), '12 345,67%' );
            assert.equal( formattingP0.format( val ), '12 346%' );
            assert.equal( formattingP1.format( val ), '12 345,7%' );

            assert.equal( formattingP1.format( val, enCulture ), '12,345.7 %' );
        } );

        it( 'should format number', function() {
            //Given
            var formattingN = new InfinniUI.NumberFormat( 'n' );
            var formattingN0 = new InfinniUI.NumberFormat( 'n0' );
            var formattingN1 = new InfinniUI.NumberFormat( 'n1' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var val = 1234.5678;

            //Then
            assert.equal( formattingN.format( val ), '1 234,57' );
            assert.equal( formattingN0.format( val ), '1 235' );
            assert.equal( formattingN1.format( val ), '1 234,6' );

            assert.equal( formattingN1.format( val, enCulture ), '1,234.6' );
        } );

        it( 'should format currency', function() {
            //Given
            var formattingC = new InfinniUI.NumberFormat( 'c' );
            var formattingC0 = new InfinniUI.NumberFormat( 'c0' );
            var formattingC1 = new InfinniUI.NumberFormat( 'c1' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var val = 1234.5678;

            //Then
            assert.equal( formattingC.format( val ), '1 234,57р.' );
            assert.equal( formattingC0.format( val ), '1 235р.' );
            assert.equal( formattingC1.format( val ), '1 234,6р.' );

            assert.equal( formattingC1.format( val, enCulture ), '$1,234.6' );
        } );

        it( 'should format collections', function() {
            //Given
            var formattingC = new InfinniUI.NumberFormat( 'c' );
            var formattingC0 = new InfinniUI.NumberFormat( 'c0' );
            var formattingC1 = new InfinniUI.NumberFormat( 'c1' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var val = [1234.5678, 2901.2345, 2678.9012];

            //Then
            assert.equal( formattingC.format( val ), '1 234,57р., 2 901,23р., 2 678,90р.' );
            assert.equal( formattingC0.format( val ), '1 235р., 2 901р., 2 679р.' );
            assert.equal( formattingC1.format( val ), '1 234,6р., 2 901,2р., 2 678,9р.' );

            assert.equal( formattingC1.format( val, enCulture ), '$1,234.6, $2,901.2, $2,678.9' );
        } );

    } );

} );
