describe( 'CheckBox', function() {
    var checkbox;

    beforeEach( function() {
        checkbox = new InfinniUI.CheckBox();
    } );

    describe( 'Render', function() {

        describe( 'Setting the properties', function() {

            it( 'Setting property: visible', function() {
                //Given
                var $el = checkbox.render();
                assert.isFalse( $el.hasClass( 'hidden' ) );

                //When
                checkbox.setVisible( false );

                //Then
                assert.isTrue( $el.hasClass( 'hidden' ) );
            } );

            it( 'Setting property: text', function() {
                //Given
                checkbox.setText( 'Text 1' );

                var $el = checkbox.render(),
                    $label = $( '.checkbox-label', $el );

                assert.equal( $label.html(), 'Text 1' );

                //When
                checkbox.setText( 'Text 2' );

                //Then
                assert.equal( $label.html(), 'Text 2' );
            } );

            it( 'Setting property: Enabled', function() {
                //Given
                var $el = checkbox.render(),
                    $input = $( 'input', $el );

                assert.equal( $input.prop( 'disabled' ), false, 'Enabled by default' );

                //When
                checkbox.setEnabled( false );

                //Then
                assert.equal( $input.prop( 'disabled' ), true, 'Disable element' );
            } );

        } );

        describe( 'events', function() {
            it( 'Change value on click', function() {
                //Given
                var $el = checkbox.render(),
                    $input = $( 'input', $el );

                checkbox.setValue( false );

                //When
                $input.click();

                //Then
                assert.equal( checkbox.getValue(), true, 'value changed' );
                assert.equal( $input.prop( 'checked' ), true, 'checkbox checked' );
            } );
        } );

    } );

} );
