describe( 'NumberEditMask', function() {
    describe( 'format', function() {

        it( 'successful build template', function() {
            //Given
            var editMask = new InfinniUI.DateTimeEditMask();
            editMask.mask = '%d MM yyyy г.';
            //When
            var template = editMask.buildTemplate();
            //Then
            assert.isArray( template );
            assert.lengthOf( template, 6 );
        } );

        it( 'successful format value', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена n3 руб. за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );
            //When
            editMask.reset( '50' );
            var text = editMask.getText();
            //Then
            assert.equal( text, 'Цена 50,000 руб. за 1 кг' );
        } );

        it( 'successful setCharAt', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена n3 руб. за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( '50' );
            var position = 5;
            position = editMask.setCharAt( '1', position );
            position = editMask.setCharAt( '2', position );
            position = editMask.setCharAt( '3', position );
            position = editMask.setCharAt( '4', position );
            position = editMask.setCharAt( ',', position );
            position = editMask.setCharAt( '9', position );
            var text = editMask.getText();

            //Then
            assert.equal( text, 'Цена 123 450,900 руб. за 1 кг' );
            assert.equal( position, 14 );

        } );

        it( 'successful setNextValue/setPrevValue', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена n3 руб. за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( '50' );
            var position = 5;
            position = editMask.setNextValue( position );
            position = editMask.setNextValue( position );
            position = editMask.setCharAt( ',', position );
            position = editMask.setPrevValue( position );
            position = editMask.setPrevValue( position );
            var text = editMask.getText();

            //Then
            assert.equal( text, 'Цена 50,000 руб. за 1 кг' );
            assert.equal( position, 8 );

        } );

        it( 'successful delete chars', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена n3 руб. за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( 123456789.876 );
            var position = 20;
            position = editMask.deleteCharLeft( position );   //"Цена 123 456 789,870 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 123 456 789,800 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 123 456 789,000 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 12 345 678,000 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 1 234 567,000 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 123 456,000 руб. за 1 кг"
            position = editMask.deleteCharLeft( position );   //"Цена 12 345,000 руб. за 1 кг"
            position = editMask.moveToPrevChar( position );
            position = editMask.moveToPrevChar( position );
            position = editMask.moveToPrevChar( position );
            position = editMask.moveToPrevChar( position );
            position = editMask.deleteCharRight( position );   //"Цена 1 245,000 руб. за 1 кг"
            position = editMask.deleteCharRight( position );   //"Цена 125,000 руб. за 1 кг"
            var text = editMask.getText();

            //Then
            assert.equal( text, 'Цена 125,000 руб. за 1 кг' );
            assert.equal( position, 7 );

        } );

        it( 'successful movePrevChar', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена n3 руб. за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( 1234.567 );   //"Цена 1 234,567 руб. за 1 кг"
            var position = 14;
            position = editMask.moveToPrevChar( position );
            position = editMask.moveToPrevChar( position );
            position = editMask.moveToPrevChar( position );

            //Then
            assert.equal( position, 11 );

        } );

        it( 'successful decimalSeparator for currency', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена c3 за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( null );   //"Цена _,___ руб. за 1 кг"
            var position = 5;
            position = editMask.setCharAt( '1', position );
            position = editMask.setCharAt( ',', position );

            //Then
            assert.equal( position, 7 );
            assert.equal( editMask.getText(), 'Цена 1,000р. за 1 кг' );
        } );

        it( 'successful decimal part for currency', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена c2 за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( null );   //"Цена _,___ руб. за 1 кг"
            var position = 5;
            position = editMask.setCharAt( '1', position );
            position = editMask.setCharAt( ',', position );
            position = editMask.setCharAt( '2', position );
            position = editMask.setCharAt( '3', position );
            position = editMask.setCharAt( '4', position );

            //Then
            assert.equal( position, 9 );
            assert.equal( editMask.getText(), 'Цена 1,23р. за 1 кг' );

        } );

        it( 'successful move to start', function() {
            //Given
            var editMask = new InfinniUI.NumberEditMask();
            editMask.mask = 'Цена c2 за 1 кг';
            editMask.format = new InfinniUI.NumberFormat();
            editMask.format.setFormat( editMask.mask );

            //When
            editMask.reset( null );
            var position = editMask.moveToPrevChar( 0 );

            //Then
            assert.equal( position, 5 );
            assert.equal( editMask.getText(), 'Цена _,__р. за 1 кг' );

        } );

    } );


} );
