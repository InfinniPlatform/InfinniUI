describe( 'TimePickerControl', function() {
    var builder = new InfinniUI.ApplicationBuilder();

    describe( 'use edit mask', function() {
        it( 'as DateTimeEditMask', function() {
            var dateTimePicker = builder.buildType( 'TimePicker', {
                EditMask: {
                    DateTimeEditMask: {
                        Mask: 'HH:mm:ss'
                    }
                }
            } );

            var $el = dateTimePicker.render();
            var unixtime = 14 * 60 * 60 + 20 * 60 ;

            dateTimePicker.setValue( unixtime );

            dateTimePicker.control.controlView.setEditMode( true );
            assert.equal( $( 'input', $el ).val(), '14:20:00' );
        } );
    } );

} );