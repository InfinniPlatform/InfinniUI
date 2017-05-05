describe( 'ServerAction', function() {
    it( 'successful build', function() {
        // Given
        var builder = new InfinniUI.ApplicationBuilder();
        var metadata = {
            ServerAction: {
                ContentType: 'application/json',
                Method: 'post',
                Origin: 'http://some.ru',
                Path: '/some/<%param1%>/',
                Data: {
                    a: 2,
                    b: '<%param2%>'
                },
                Params: {
                    param1: 4,
                    param2: 'abc'
                }
            }
        };

        // When
        var serverAction = builder.build( metadata, { parentView: fakeView() } );

        // Then
        assert.equal( serverAction.getProperty( 'contentType' ), 'application/json' );
        assert.equal( serverAction.getProperty( 'method' ), 'post' );
        assert.equal( serverAction.getProperty( 'origin' ), 'http://some.ru' );
        assert.equal( serverAction.getProperty( 'path' ), '/some/<%param1%>/' );

        assert.equal( serverAction.getParam( 'param1' ), 4 );
        assert.equal( serverAction.getParam( 'param2' ), 'abc' );
    } );

    it( 'should update param from binding', function() {
        // Given
        var builder = new InfinniUI.ApplicationBuilder();

        var label = new InfinniUI.Label();
        label.setName( 'Label_1' );
        label.setValue( 'oldValue' );

        var view = new InfinniUI.View();
        view.registerElement( label );

        var metadata = {
            ServerAction: {
                Origin: 'http://some.ru',
                Path: '/some/<%param1%>/',
                Params: {
                    param: {
                        Source: 'Label_1',
                        Property: 'value'
                    }
                }
            }
        };

        var serverAction = builder.build( metadata, { parentView: view } );

        // When
        assert.equal( serverAction.getParam( 'param' ), 'oldValue' );
        label.setValue( 'newValue' );

        // Then
        assert.equal( serverAction.getParam( 'param' ), 'newValue' );
    } );

    describe( 'should constract correct url', function() {
        it( 'get', function() {
            // Given
            InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
                return {
                    request: function( requestData ) {
                        window.serverActionTestUrlParams = requestData;
                    }
                };
            } );

            var builder = new InfinniUI.ApplicationBuilder();
            var metadata = {
                ServerAction: {
                    Origin: 'http://some.ru',
                    Path: '/some/<%param1%>',
                    Data: {
                        a: 2,
                        b: '<%param2%>'
                    },
                    Params: {
                        param1: 4,
                        param2: 6
                    }
                }
            };

            var serverAction = builder.build( metadata, { parentView: fakeView() } );

            // When
            serverAction.execute();

            // Then
            assert.equal( window.serverActionTestUrlParams.method, 'GET' );
            assert.equal( window.serverActionTestUrlParams.requestUrl, 'http://some.ru/some/4?a=2&b=6' );
            assert.equal( window.serverActionTestUrlParams.contentType, 'application/x-www-form-urlencoded; charset=utf-8' );
        } );


        it( 'post', function() {
            // Given
            InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
                return {
                    request: function( requestData ) {
                        window.serverActionTestUrlParams = requestData;
                    }
                };
            } );

            var builder = new InfinniUI.ApplicationBuilder();
            var metadata = {
                ServerAction: {
                    Method: 'Post',
                    ContentType: false,
                    Origin: 'http://some.ru',
                    Path: '/some/<%param1%>',
                    Data: {
                        a: 2,
                        b: 'user#<%param2%>'
                    },
                    Params: {
                        param1: 4,
                        param2: 6
                    }
                }
            };

            var serverAction = builder.build( metadata, { parentView: fakeView() } );

            // When
            serverAction.execute();

            // Then
            assert.equal( window.serverActionTestUrlParams.method, 'POST' );
            assert.equal( window.serverActionTestUrlParams.requestUrl, 'http://some.ru/some/4' );
            assert.equal( window.serverActionTestUrlParams.contentType, false );
            assert.deepEqual( window.serverActionTestUrlParams.args, { a: 2, b: 'user#6' } );
        } );

        it( 'should convert data to string JSON if contentType is application/json', function() {
            // Given
            InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
                return {
                    request: function( requestData ) {
                        window.serverActionTestUrlParams = requestData;
                    }
                };
            } );

            var builder = new InfinniUI.ApplicationBuilder();
            var metadata = {
                ServerAction: {
                    Method: 'Post',
                    ContentType: 'application/json; charset=utf-8',
                    Origin: 'http://some.ru',
                    Path: '',
                    Data: {
                        a: 2,
                        b: 'abc'
                    }
                }
            };

            var serverAction = builder.build( metadata, { parentView: fakeView() } );

            // When
            serverAction.execute();

            // Then
            assert.equal( window.serverActionTestUrlParams.args, '{"a":2,"b":"abc"}' );
        } );
    } );


    it( 'should escape quote in Data', function() {
        var data;
        // Given
        InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
            return {
                request: function( requestData ) {
                    data = requestData;
                }
            };
        } );

        var builder = new InfinniUI.ApplicationBuilder();
        var json = { 'name': 'value' };
        var metadata = {
            ServerAction: {
                Origin: 'http://some.ru',
                Path: '/json',
                Method: 'POST',
                Data: {
                    b: '<%param1%>'
                },
                Params: {
                    param1: JSON.stringify( json )
                }
            }
        };

        var serverAction = builder.build( metadata, { parentView: fakeView() } );

        // When
        serverAction.execute();

        // Then
        assert.equal( data.args.b, JSON.stringify( json ) );
    } );

    it( 'should keep data type', function() {
        var data;
        // Given
        InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
            return {
                request: function( requestData ) {
                    data = requestData;
                }
            };
        } );

        var builder = new InfinniUI.ApplicationBuilder();

        var metadata = {
            ServerAction: {
                Origin: 'http://some.ru',
                Path: '/json',
                Method: 'POST',
                Data: {
                    'Number': '<%paramNumber%>',
                    'String': '<%paramString%>',
                    'Null': '<%paramNull%>'
                },
                Params: {
                    paramNumber: 1,
                    paramString: 'text',
                    paramNull: null
                }
            }
        };

        var serverAction = builder.build( metadata, { parentView: fakeView() } );

        // When
        serverAction.execute();

        // Then
        assert.equal( JSON.stringify( data.args ), JSON.stringify( { 'Number': 1, 'String': 'text', 'Null': null } ) );
    } );

    it( 'should use "config.serverUrl" as "Origin" by default', function() {
        var data;
        // Given
        var oldServerUrl = InfinniUI.config.serverUrl;

        InfinniUI.config.serverUrl = 'ftp://ftp.site.org/';

        InfinniUI.providerRegister.register( 'ServerActionProvider', function() {
            return {
                request: function( requestData ) {
                    data = requestData;
                }
            };
        } );

        var builder = new InfinniUI.ApplicationBuilder();

        var metadata = {
            ServerAction: {
                Path: '/public',
                Method: 'POST',
                Data: {
                    'Number': '<%paramNumber%>',
                    'String': '<%paramString%>',
                    'Null': '<%paramNull%>'
                },
                Params: {
                    paramNumber: 1,
                    paramString: 'text',
                    paramNull: null
                }
            }
        };

        var serverAction = builder.build( metadata, { parentView: fakeView() } );

        // When
        serverAction.execute();

        // Then
        assert.equal( data.requestUrl, 'ftp://ftp.site.org/public' );
    } );

} );
