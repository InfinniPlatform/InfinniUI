describe( 'TextBox', function() {
    var builder = new InfinniUI.ApplicationBuilder();

    describe( 'API', function() {
        var element = builder.buildType( 'TextBox', {} );

        describe( 'Implementing TextBox Methods', function() {
            ['getMultiline', 'setMultiline', 'getLineCount', 'setLineCount']
                .forEach( function( methodName ) {
                    it( methodName, function() {
                        testHelper.checkMethod( element, methodName );
                    } );

                } );
        } );

        describe( 'Implementing TextEditorBase Methods', function() {
            testHelper.checkTextEditorBaseMethods( element );
        } );

        describe( 'Implementing EditorBase Methods', function() {
            testHelper.checkEditorBaseMethods( element );
        } );

        describe( 'Implementing Element Methods', function() {
            testHelper.checkElementMethods( element );
        } );

        it( 'Events onLoad, onValueChanged', function() {
            // Given
            var textBox = new InfinniUI.TextBox(),
                onLoadFlag = 0,
                onValueChanged = 0;

            textBox.onLoaded( function() {
                onLoadFlag++;
            } );
            textBox.onValueChanged( function() {
                onValueChanged++;
            } );

            assert.equal( onLoadFlag, 0 );
            assert.equal( onValueChanged, 0 );

            // When
            textBox.render();
            textBox.setValue( 'new' );

            // Then
            assert.equal( onLoadFlag, 1 );
            assert.equal( onValueChanged, 1 );
        } );

        it( 'should be true if scriptsHandlers call', function() {
            //Given
            var builder = new InfinniUI.ApplicationBuilder();
            var view = new InfinniUI.View();
            var metadata = {
                'TextBox': {
                    OnValueChanged: 'OnValueChanged',
                    OnLoaded: 'OnLoaded'
                }
            };
            var events = {
                OnValueChanged: 0,
                OnLoaded: 0
            };
            var scripts = view.getScripts();
            scripts.add( {
                name: 'OnValueChanged',
                func: function() {
                    events.OnValueChanged++;
                }
            } );
            scripts.add( {
                name: 'OnLoaded',
                func: function() {
                    events.OnLoaded++;
                }
            } );

            //When
            var element = builder.build( metadata, { parentView: view, parent: view, builder: builder } );
            element.setValue( true );
            element.render();

            // Then
            assert.equal( events.OnLoaded, 1 );
            assert.equal( events.OnValueChanged, 1 );
        } );
        //@TODO Add Checking Events
    } );

    describe( 'render', function() {

        var element = builder.buildType( 'TextBox', {} );

        it( 'Setting the properties: value, name, enabled, visible, horizontalAlignment', function() {
            // Given

            // When
            var $el = element.render();

            // Then
            assert.equal( $el.length, 1 );
        } );

    } );
} );
