describe( 'dateUtils', function() {

    describe( 'toISO8601', function() {
        //Format DateTime: "YYYY-MM-DDTHH:MM:SS.SSSS+hh:mm
        var date, timezoneOffset;


        it( 'should return date for current timezone offset', function() {
            //Given
            date = new Date( 2016, 2, 18, 15, 58, 30 );
            timezoneOffset = date.getTimezoneOffset();

            // When
            var strDate = InfinniUI.DateUtils.toISO8601( date );
            // Then
            var dtPart = getDateTimePart( strDate );
            var tzPart = getTimeZoneOffset( strDate );

            assert.equal( dtPart, '2016-03-18T15:58:30.0000', 'Check DateTime part' );
            assert.equal( tzPart, timezoneOffset, 'Check TimeZoneOffset part' );
        } );

        it( 'should return date for given timezone offset', function() {
            //Given
            var tzOffset = 0 - 60 * 3;     //UTC + 3
            date = new Date( '2016-03-18T10:58:30Z' );
            timezoneOffset = date.getTimezoneOffset();

            // When
            var strDate = InfinniUI.DateUtils.toISO8601( date, {
                timezoneOffset: tzOffset
            } );
            //Then
            var dtPart = getDateTimePart( strDate );
            var tzPart = getTimeZoneOffset( strDate );

            assert.equal( dtPart, '2016-03-18T13:58:30.0000', 'Check DateTime part' );
            assert.equal( tzPart, tzOffset, 'Check TimeZoneOffset part' );
        } );

        function getDateTimePart( strDate ) {
            return strDate.substr( 0, 'yyyy-mm-ddThh:mm:ss.SSSS'.length );
        }

        function getTimeZoneOffset( strDate ) {
            return 60 * strDate.substr( 0 - '+HH:MM'.length )
                .split( ':' )
                .map( function( val ) {
                    return parseInt( val, 10 );
                } )
                .reduce( function( sum, val ) {
                    return sum - val;
                }, 0 );
        }

    } );
} );