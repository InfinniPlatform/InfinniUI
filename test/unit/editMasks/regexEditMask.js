describe( 'RegexEditMask', function() {
    describe( 'format', function() {

        it( 'successful test mask', function() {
            //Given
            var editMask = new InfinniUI.RegexEditMask();
            editMask.mask = '^[0-9]{4}$';

            //When
            editMask.reset( '1234' );

            //Then
            assert.equal( editMask.getValue(), '1234' );
            assert.isTrue( editMask.getIsComplete( '1234' ) );
            assert.isFalse( editMask.getIsComplete( '123' ) );
        } );

    } );

} );
