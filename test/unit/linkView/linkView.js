describe( 'LinkView', function() {

    describe( 'setOpenMode', function() {
        it( 'should set openMode', function() {
            //Given
            var view = new InfinniUI.LinkView();

            //When
            view.setOpenMode( 'Dialog' );

            //Then
            assert.equal( view.getOpenMode(), 'Dialog' );
        } );

        it( 'should set openMode Default by default', function() {
            //Given
            var view = new InfinniUI.LinkView();

            //Then
            assert.equal( view.getOpenMode(), 'Default' );
        } );

        it( 'should set openMode Default if no mode passed', function() {
            //Given
            var view = new InfinniUI.LinkView();

            //When
            view.setOpenMode( null );

            //Then
            assert.equal( view.getOpenMode(), 'Default' );
        } );
    } );
} );
