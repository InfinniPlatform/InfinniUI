describe( 'DateTimePickerControl', function() {
    var builder = new InfinniUI.ApplicationBuilder();

    describe( 'use edit mask', function() {
        it( 'as DateTimeEditMask', function() {
            var dateTimePicker = builder.buildType( 'DateTimePicker', {
                EditMask: {
                    DateTimeEditMask: {
                        Mask: 'dd MM yyyy'
                    }
                }
            } );


            var $el = dateTimePicker.render();
            dateTimePicker.setValue( '2017-04-26T17:06:00+05:00' );

            dateTimePicker.control.controlView.setEditMode( true );
            assert.equal( $( 'input', $el ).val(), '26 04 2017' );
        } );

        it( 'as DateTimeEditMask with timezone offset', function() {
            var dateTimePicker = builder.buildType( 'DateTimePicker', {
                TimeZone: -180,
                EditMask: {
                    DateTimeEditMask: {
                        Mask: 'dd.MM.yyyy HH:mm:ss'
                    }
                }
            } );

            var $el = dateTimePicker.render();
            dateTimePicker.setValue( '2017-04-26T08:11:12+05:00' );

            dateTimePicker.control.controlView.setEditMode( true );
            assert.equal( $( 'input', $el ).val(), '26.04.2017 06:11:12' );
        } );
    } );

    describe( 'render', function() {
        it( 'should update date when change value', function() {
            //Given
            var dateTimePicker = builder.buildType( 'DateTimePicker', {} );
            var oldDate = new Date( 2012, 10, 2 );
            var newDate = new Date( 2014, 7, 28 );
            var $el = dateTimePicker.render().find( '.pl-datepicker-input' );
            dateTimePicker.setValue( InfinniUI.DateUtils.toISO8601( oldDate ) );

            //When
            dateTimePicker.setValue( InfinniUI.DateUtils.toISO8601( newDate ) );

            //Then
            assert.equal( $el.val(), '28.08.2014' );
        } );

        it( 'should clear date when value is null', function() {
            //Given
            var dateTimePicker = new InfinniUI.DateTimePickerControl();
            var value = InfinniUI.DateUtils.toISO8601( new Date( 2012, 10, 2 ) );

            dateTimePicker.setValue( value );
            assert.equal( dateTimePicker.getValue(), value );

            //When
            dateTimePicker.setValue( null );

            //Then
            assert.isNull( dateTimePicker.getValue() );
        } );

        it( 'should set minDate and maxDate', function() {
            //Given
            var dateTimePicker = builder.buildType( 'DateTimePicker', {} );
            var minDate = InfinniUI.DateUtils.toISO8601( new Date( 2010, 0, 1 ) );
            var maxDate = InfinniUI.DateUtils.toISO8601( new Date( 2014, 11, 31 ) );

            //When
            dateTimePicker.setMinValue( minDate );
            dateTimePicker.setMaxValue( maxDate );

            //Then
            assert.equal( dateTimePicker.getMinValue(), minDate );
            assert.equal( dateTimePicker.getMaxValue(), maxDate );
        } );

        it( 'should set Enabled', function() {
            //Given
            var dateTimePicker = builder.buildType( 'DateTimePicker', {} );
            dateTimePicker.setEnabled( false );

            var $el = dateTimePicker.render().find( '.pl-datepicker-input, .pl-datepicker-calendar' );
            assert.equal( $el.length, 2 );
            $el.each( function( i, el ) {
                var $el = $( el );
                assert.isTrue( $el.prop( 'disabled' ) );
            } );

            //When
            dateTimePicker.setEnabled( true );

            //Then
            $el.each( function( i, el ) {
                var $el = $( el );
                assert.isFalse( $el.prop( 'disabled' ) );
            } );

        } );

    } );
} );
