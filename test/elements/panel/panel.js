describe( 'PanelElement', function() {
    var builder = new InfinniUI.ApplicationBuilder();

    describe( 'API', function() {
        var element = builder.buildType( 'Panel', {} );

        describe( 'Implementing Panel API', function() {
            it( 'Implement methods', function() {
                testHelper.checkMethod( element, 'getCollapsible' );
                testHelper.checkMethod( element, 'setCollapsible' );
                testHelper.checkMethod( element, 'getCollapsed' );
                testHelper.checkMethod( element, 'setCollapsed' );
                testHelper.checkMethod( element, 'getHeaderTemplate' );
                testHelper.checkMethod( element, 'setHeaderTemplate' );
                testHelper.checkMethod( element, 'getHeader' );
                testHelper.checkMethod( element, 'setHeader' );
            } );

            it( 'Implement events subscriber', function() {
                testHelper.checkMethod( element, 'onExpanding' );
                testHelper.checkMethod( element, 'onExpanded' );
                testHelper.checkMethod( element, 'onCollapsing' );
                testHelper.checkMethod( element, 'onCollapsed' );
            } );

        } );

        describe( 'Implementing Container Methods', function() {
            testHelper.checkContainerMethods( element );
        } );

        describe( 'Implementing Element Methods', function() {
            testHelper.checkElementMethods( element );
        } );

        it( 'Default values', function() {
            var element = builder.buildType( 'Panel', {} );

            assert.equal( element.getCollapsible(), false, 'Collapsible' );
            assert.equal( element.getCollapsed(), false, 'Collapsed' );
            assert.isFunction( element.getHeaderTemplate, 'HeaderTemplate by default' );
        } );

    } );


    describe( 'Panel events handler', function() {

        function bindEvents( element ) {
            var events = [];
            element.onCollapsed( function() {
                events.push( 'onCollapsed' );
            } );

            element.onCollapsing( function() {
                events.push( 'onCollapsing' );
            } );

            element.onExpanded( function() {
                events.push( 'onExpanded' );
            } );

            element.onExpanding( function() {
                events.push( 'onExpanding' );
            } );

            return events;
        }

        function createPanel() {
            return builder.buildType( 'Panel', {} );
        }

        it( 'Should fire onCollapsing on setCollapsed(true)', function() {
            //Given
            var element = createPanel();
            var events = bindEvents( element );
            //When
            element.setCollapsed( true );

            //Then
            assert.lengthOf( events, 2 );
            assert.equal( events[ 0 ], 'onCollapsing', 'onCollapsing' );
            assert.equal( events[ 1 ], 'onCollapsed', 'onCollapsed' );
            assert.equal( element.getCollapsed(), true );
        } );

        it( 'Should fire onExpanding on setCollapsed(false)', function() {
            //Given
            var element = createPanel();
            element.setCollapsed( true );
            var events = bindEvents( element );
            //When
            element.setCollapsed( false );

            //Then
            assert.lengthOf( events, 2 );
            assert.equal( events[ 0 ], 'onExpanding', 'onExpanding' );
            assert.equal( events[ 1 ], 'onExpanded', 'onExpanded' );
            assert.equal( element.getCollapsed(), false );
        } );

        it( 'Should cancel setCollapsed(true) when one of onCollapsing returns false', function() {
            //Given
            var element = createPanel();
            var events = bindEvents( element );
            element.onCollapsing( function() {
                events.push( 'onCollapsing' );
                return false;
            } );

            //When
            element.setCollapsed( true );

            //Then
            assert.lengthOf( events, 2 );
            assert.equal( events[ 0 ], 'onCollapsing', 'onCollapsing' );
            assert.equal( events[ 1 ], 'onCollapsing', 'onCollapsing' );
            assert.equal( element.getCollapsed(), false );
        } );

        it( 'Should cancel setCollapsed(false) when one of onExpanding returns false', function() {
            //Given
            var element = createPanel();
            element.setCollapsed( true );
            var events = bindEvents( element );

            element.onExpanding( function() {
                events.push( 'onExpanding' );
                return false;
            } );

            //When
            element.setCollapsed( false );

            //Then
            assert.lengthOf( events, 2 );
            assert.equal( events[ 0 ], 'onExpanding', 'onExpanding' );
            assert.equal( events[ 1 ], 'onExpanding', 'onExpanding' );
            assert.equal( element.getCollapsed(), true );
        } );


    } );

} );
