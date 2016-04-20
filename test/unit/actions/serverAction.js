describe('ServerAction', function () {
    it('successful build', function () {
        // Given
        var builder = new ApplicationBuilder();
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
        var serverAction = builder.build(metadata, {parentView: fakeView()});

        // Then
        assert.equal(serverAction.getProperty('contentType'), 'application/json');
        assert.equal(serverAction.getProperty('method'), 'post');
        assert.equal(serverAction.getProperty('origin'), 'http://some.ru');
        assert.equal(serverAction.getProperty('path'), '/some/<%param1%>/');

        assert.equal(serverAction.getParam('param1'), 4);
        assert.equal(serverAction.getParam('param2'), 'abc');
    });

    it('should update param from binding', function () {
        // Given
        var builder = new ApplicationBuilder();

        var label = new Label();
        label.setName('Label_1');
        label.setValue('oldValue');

        var view = new View();
        view.registerElement(label);

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

        var serverAction = builder.build(metadata, {parentView: view});

        // When
        assert.equal(serverAction.getParam('param'), 'oldValue');
        label.setValue('newValue');

        // Then
        assert.equal(serverAction.getParam('param'), 'newValue');
    });

    describe('should constract correct url', function () {
        it('get', function () {
            // Given
            window.providerRegister.register('ServerActionProvider', function () {
                return {
                    request: function (requestData) {
                        window.serverActionTest_urlParams = requestData;
                    }
                };
            });

            var builder = new ApplicationBuilder();
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

            var serverAction = builder.build(metadata, {parentView: fakeView()});

            // When
            serverAction.execute();

            // Then
            assert.equal(window.serverActionTest_urlParams.method, 'GET');
            assert.equal(window.serverActionTest_urlParams.requestUrl, 'http://some.ru/some/4?a=2&b=6');
            assert.equal(window.serverActionTest_urlParams.contentType, 'application/x-www-form-urlencoded; charset=utf-8');
        });

        it('post', function () {
            // Given
            window.providerRegister.register('ServerActionProvider', function () {
                return {
                    request: function (requestData) {
                        window.serverActionTest_urlParams = requestData;
                    }
                };
            });

            var builder = new ApplicationBuilder();
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

            var serverAction = builder.build(metadata, {parentView: fakeView()});

            // When
            serverAction.execute();

            // Then
            assert.equal(window.serverActionTest_urlParams.method, 'POST');
            assert.equal(window.serverActionTest_urlParams.requestUrl, 'http://some.ru/some/4');
            assert.equal(window.serverActionTest_urlParams.contentType, false);
            assert.deepEqual(window.serverActionTest_urlParams.args, {a: 2, b: "user#6"});
        });

        it('should convert data to string JSON if contentType is application/json', function () {
            // Given
            window.providerRegister.register('ServerActionProvider', function () {
                return {
                    request: function (requestData) {
                        window.serverActionTest_urlParams = requestData;
                    }
                };
            });

            var builder = new ApplicationBuilder();
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

            var serverAction = builder.build(metadata, {parentView: fakeView()});

            // When
            serverAction.execute();

            // Then
            assert.equal(window.serverActionTest_urlParams.args, '{"a":2,"b":"abc"}');
        });
    });
});
