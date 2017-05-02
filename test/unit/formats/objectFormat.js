describe( 'ObjectFormat', function() {
    describe( 'format', function() {

        it( 'successful build', function() {
            //Given
            var metadata = { Format: '${}' };
            var builder = new InfinniUI.ObjectFormatBuilder();
            //When
            var format = builder.build( null, { metadata: metadata } );
            //Then
            assert.isFunction( format.format );
            assert.equal( format.getFormat(), '${}' );
        } );

        it( 'should format simple data type ', function() {
            //Given
            var formatter1 = new InfinniUI.ObjectFormat( 'Hello, ${}!' );
            var formatter2 = new InfinniUI.ObjectFormat( 'Birth date: ${:d}' );
            var formatter3 = new InfinniUI.ObjectFormat( 'Birth time: ${:T}' );
            var formatter4 = new InfinniUI.ObjectFormat( 'Weight: ${:n2} kg' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var value1 = 'Ivan';
            var value2 = new Date( '4 January 1908 12:34:56' );
            var value3 = new Date( '4 January 1908 12:34:56' );
            var value4 = 123.456;

            //Then
            assert.equal( formatter1.format( value1, enCulture ), 'Hello, Ivan!' );
            assert.equal( formatter2.format( value2, enCulture ), 'Birth date: 1/4/1908' );
            assert.equal( formatter3.format( value3, enCulture ), 'Birth time: 12:34:56 PM' );
            assert.equal( formatter4.format( value4, enCulture ), 'Weight: 123.46 kg' );
            assert.equal( formatter4.format( value4 ), 'Weight: 123,46 kg' );
        } );

        it( 'should format complex data type ', function() {
            //Given
            var formatter1 = new InfinniUI.ObjectFormat( 'Hello, ${FirstName} ${MiddleName}!' );
            var formatter2 = new InfinniUI.ObjectFormat( 'Birth date: ${BirthDate:d}' );
            var formatter3 = new InfinniUI.ObjectFormat( 'Birth time: ${BirthDate:T}' );
            var formatter4 = new InfinniUI.ObjectFormat( 'Weight: ${Weight:n2} kg' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var value1 = { FirstName: 'Ivan', MiddleName: 'Ivanovich' };
            var value2 = { BirthDate: new Date( '4 January 1908 12:34:56' ) };
            var value3 = { BirthDate: new Date( '4 January 1908 12:34:56' ) };
            var value4 = { Weight: 123.456 };

            //Then
            assert.equal( formatter1.format( value1, enCulture ), 'Hello, Ivan Ivanovich!' );
            assert.equal( formatter2.format( value2, enCulture ), 'Birth date: 1/4/1908' );
            assert.equal( formatter3.format( value3, enCulture ), 'Birth time: 12:34:56 PM' );
            assert.equal( formatter4.format( value4, enCulture ), 'Weight: 123.46 kg' );
        } );

        it( 'should format collection ', function() {
            //Given
            var formatter1 = new InfinniUI.ObjectFormat( 'Hello, ${FirstName} ${MiddleName}!' );
            var formatter2 = new InfinniUI.ObjectFormat( 'Birth date: ${BirthDate:d}' );
            var formatter3 = new InfinniUI.ObjectFormat( 'Birth time: ${BirthDate:T}' );
            var formatter4 = new InfinniUI.ObjectFormat( 'Weight: ${Weight:n2} kg' );
            var enCulture = InfinniUI.localizations[ 'en-US' ];

            //When
            var value1 = [{ FirstName: 'Ivan', MiddleName: 'Ivanovich' }, { FirstName: 'Petr', MiddleName: 'Petrov' }];
            var value2 = { BirthDate: new Date( '4 January 1908 12:34:56' ) };
            var value3 = { BirthDate: new Date( '4 January 1908 12:34:56' ) };
            var value4 = [{ Weight: 123.456 }, { Weight: 789.012 }];

            //Then
            assert.equal( formatter1.format( value1, enCulture ), 'Hello, Ivan Ivanovich!, Hello, Petr Petrov!' );
            assert.equal( formatter2.format( value2, enCulture ), 'Birth date: 1/4/1908' );
            assert.equal( formatter3.format( value3, enCulture ), 'Birth time: 12:34:56 PM' );
            assert.equal( formatter4.format( value4, enCulture ), 'Weight: 123.46 kg, Weight: 789.01 kg' );
        } );

        it( 'should format when value is undefined', function() {
            //Given
            var formatter = new InfinniUI.ObjectFormat( 'Hello, ${FirstName} ${MiddleName}!' );
            //When
            //Then
            assert.equal( formatter.format(), 'Hello,  !' );
        } );

        it( 'should format when value is null', function() {
            //Given
            var formatter = new InfinniUI.ObjectFormat( 'Hello, ${FirstName} ${MiddleName}!' );
            //When
            //Then
            assert.equal( formatter.format( null ), 'Hello,  !' );
        } );
    } );

} );
