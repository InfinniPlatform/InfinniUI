describe('DatePickerControl', function () {
    var builder = new InfinniUI.ApplicationBuilder();

    describe( 'use edit mask', function() {
        it( 'as DateTimeEditMask', function() {
            var dateTimePicker = builder.buildType( 'DatePicker', {
                EditMask: {
                    DateTimeEditMask: {
                        Mask: 'dd MM yyyy'
                    }
                }
            } );

            var $el = dateTimePicker.render();
            var unixtime = Date.UTC( 2017, 3, 26 ) / 1000;

            dateTimePicker.setValue( unixtime );

            dateTimePicker.control.controlView.setEditMode( true );
            assert.equal( $( 'input', $el ).val(), '26 04 2017' );
        } );
    } );

} );