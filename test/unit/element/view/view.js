describe('View', function () {

    it('should get scripts', function () {
        //Given
        var view = new View();

        //When
        var scripts = view.getScripts();

        //Then
        assert.isDefined(scripts);
        assert.instanceOf(scripts, Collection);

        //When
        scripts.add('script');

        //Then
        assert.equal(view.getScripts().length, 1, 'getScripts should not override scripts');
    });

    it('should get parameters', function () {
        //Given
        var view = new View();

        //When
        var parameters = view.getParameters();

        //Then
        assert.isDefined(parameters);
        assert.instanceOf(parameters, Collection);

        //When
        parameters.add('parameter');

        //Then
        assert.equal(view.getParameters().length, 1, 'getParameters should not override parameters');
    });

    it('should get dataSources', function () {
        //Given
        var view = new View(),
            dataSource = new DocumentDataSource({view: view});

        //When
        var dataSources = view.getDataSources();

        //Then
        assert.isDefined(dataSources);
        assert.instanceOf(dataSources, Collection);

        //When
        dataSources.add(dataSource);

        //Then
        assert.equal(view.getDataSources().length, 1, 'getDataSources should not override dataSource');
    });

    it('should set icon', function () {
        //Given
        var view = new View();

        assert.isUndefined(view.getIcon());

        //When
        view.setIcon('icon1');

        //Then
        assert.equal(view.getIcon(), 'icon1');
    });

    it('should set dialogResult', function () {
        //Given
        var view = new View();

        assert.equal(view.getDialogResult(), DialogResult.none);

        //When
        view.setDialogResult(DialogResult.accepted);

        //Then
        assert.equal(view.getDialogResult(), DialogResult.accepted);
    });

    describe('Context', function () {
        it('should get context', function () {
            //Given
            var view = new View();

            //When
            var context = view.getContext();

            //Then
            assert.isNotNull(context);
            assert.isDefined(context);
        });

        it('should refresh context on registerElement', function () {
            //Given
            var view = new View();

            //When
            view.registerElement({name: 'element'});
            var context = view.getContext();

            //Then
            assert.isDefined(context.controls['element']);
        });


        it('should refresh context on add script', function () {
            //Given
            var view = new View();
            var scripts = view.getScripts();

            //When
            scripts.add({ name: 'script', func: {} });
            var context = view.getContext();

            //Then
            assert.isDefined(context.scripts['script']);
        });

        it('should refresh context on replace script', function () {
            //Given
            var view = new View();
            var scripts = view.getScripts();
            var oldScript = { name: 'oldScript', func: {} };
            var newScript = { name: 'newScript', func: {} };

            scripts.add(oldScript);

            //When
            scripts.replace(oldScript, newScript);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.scripts['oldScript']);
            assert.isDefined(context.scripts['newScript']);
        });

        it('should refresh context on remove script', function () {
            //Given
            var view = new View();
            var scripts = view.getScripts();
            var removedScript = { name: 'removedScript', func: {} };

            scripts.add(removedScript);
            assert.isDefined(view.getContext().scripts['removedScript']);

            //When
            scripts.remove(removedScript);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.scripts['removedScript']);
        });

        it('should refresh context on reset script', function () {
            //Given
            var view = new View();
            var scripts = view.getScripts();
            var oldScript = { name: 'oldScript', func: {} };
            var newScript = { name: 'newScript', func: {} };

            scripts.add(oldScript);

            //When
            scripts.reset([newScript]);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.scripts['oldScript']);
            assert.isDefined(context.scripts['newScript']);
        });


        it('should refresh context on add parameter', function () {
            //Given
            var view = new View();
            var parameters = view.getParameters();

            //When
            parameters.add({name: 'param'});
            var context = view.getContext();

            //Then
            assert.isDefined(context.parameters['param']);
        });

        it('should refresh context on replace parameter', function () {
            //Given
            var view = new View();
            var parameters = view.getParameters();
            var oldParameter = { name: 'oldParameter' };
            var newParameter = { name: 'newParameter' };

            parameters.add(oldParameter);

            //When
            parameters.replace(oldParameter, newParameter);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.parameters['oldParameter']);
            assert.isDefined(context.parameters['newParameter']);
        });

        it('should refresh context on remove parameter', function () {
            //Given
            var view = new View();
            var parameters = view.getParameters();
            var removedParameter = { name: 'removedParameter' };

            parameters.add(removedParameter);
            assert.isDefined(view.getContext().parameters['removedParameter']);

            //When
            parameters.remove(removedParameter);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.parameters['removedParameter']);
        });

        it('should refresh context on reset parameter', function () {
            //Given
            var view = new View();
            var parameters = view.getParameters();
            var oldParameter = { name: 'oldParameter' };
            var newParameter = { name: 'newParameter' };

            parameters.add(oldParameter);

            //When
            parameters.reset([newParameter]);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.parameters['oldParameter']);
            assert.isDefined(context.parameters['newParameter']);
        });


        it('should refresh context on add dataSource', function () {
            //Given
            var view = new View();
            var dataSource = new DocumentDataSource({view: view, name: 'dataSource'});
            var dataSources = view.getDataSources();

            //When
            dataSources.add(dataSource);
            var context = view.getContext();

            //Then
            assert.isDefined(context.dataSources['dataSource']);
        });

        it('should refresh context on replace dataSource', function () {
            //Given
            var view = new View();
            var dataSources = view.getDataSources();
            var oldDataSource = new DocumentDataSource({view: view, name: 'oldDataSource'});
            var newDataSource = new DocumentDataSource({view: view, name: 'newDataSource'});

            dataSources.add(oldDataSource);

            //When
            dataSources.replace(oldDataSource, newDataSource);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.dataSources['oldDataSource']);
            assert.isDefined(context.dataSources['newDataSource']);
        });

        it('should refresh context on remove dataSource', function () {
            //Given
            var view = new View();
            var dataSources = view.getDataSources();
            var removedDataSource = new DocumentDataSource({view: view, name: 'removedDataSource'});

            dataSources.add(removedDataSource);
            assert.isDefined(view.getContext().dataSources['removedDataSource']);

            //When
            dataSources.remove(removedDataSource);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.dataSources['removedDataSource']);
        });

        it('should refresh context on reset dataSource', function () {
            //Given
            var view = new View();
            var dataSources = view.getDataSources();
            var oldDataSource = new DocumentDataSource({view: view});
            var newDataSource = new DocumentDataSource({view: view});
            oldDataSource.setName('oldDataSource');
            newDataSource.setName('newDataSource');

            dataSources.add(oldDataSource);

            //When
            dataSources.reset([newDataSource]);
            var context = view.getContext();

            //Then
            assert.isUndefined(context.dataSources['oldDataSource']);
            assert.isDefined(context.dataSources['newDataSource']);
        });
    });

    describe('Open', function () {
        it('should call event onOpening', function () {
            //Given
            var view = new View();
            window.EventOnOpeningWasCall = false;

            view.onOpening(function () {
                window.EventOnOpeningWasCall = true;
            });

            //When
            view.open();

            //Then
            assert.isTrue(window.EventOnOpeningWasCall, 'onOpening was not call');
        });

        it('should call event onOpened when onOpening passed', function () {
            //Given
            var view = new View();
            window.EventOnOpenedWasCall = false;

            view.onOpened(function () {
                window.EventOnOpenedWasCall = true;
            });

            //When
            view.open();

            //Then
            assert.isTrue(window.EventOnOpenedWasCall, 'onOpened was not call');
        });

        it('should not call event onOpened when onOpening failed', function () {
            //Given
            var view = new View();
            window.EventOnOpenedWasCall = false;

            view.onOpening(
                function () {
                    return false; // onOpening failed
                });

            view.onOpened(function () {
                window.EventOnOpenedWasCall = true;
            });

            //When
            view.open();

            //Then
            assert.isFalse(window.EventOnOpenedWasCall);
        });

        it('should select correct callback when onOpening passed', function () {
            //Given
            var view = new View();
            window.SuccessWasCall = false;
            window.ErrorWasCall = false;

            //When
            view.open(
                function () {
                    window.SuccessWasCall = true;
                },
                function () {
                    window.ErrorWasCall = true;
                }
            );

            //Then
            assert.isTrue(window.SuccessWasCall, 'success was not call');
            assert.isFalse(window.ErrorWasCall, 'error was call');
        });

        it('should select correct callback when onOpening failed', function () {
            //Given
            var view = new View();
            window.SuccessWasCall = false;
            window.ErrorWasCall = false;

            view.onOpening(
                function () {
                    return false; // onOpening failed
                });

            //When
            view.open(
                function () {
                    window.SuccessWasCall = true;
                },
                function () {
                    window.ErrorWasCall = true;
                }
            );

            //Then
            assert.isFalse(window.SuccessWasCall, 'success was call');
            assert.isTrue(window.ErrorWasCall, 'error was not call');
        });
    });

    describe('Close', function () {
        it('should call event onClosing', function () {
            //Given
            var view = new View();
            window.EventOnClosingWasCall = false;

            view.onClosing(function () {
                window.EventOnClosingWasCall = true;
            });

            //When
            view.close();

            //Then
            assert.isTrue(window.EventOnClosingWasCall, 'OnClosing was not call');
        });

        it('should call event onClosed when onClosing passed', function () {
            //Given
            var view = new View();
            window.EventOnClosedWasCall = false;

            view.onClosed(function () {
                window.EventOnClosedWasCall = true;
            });

            //When
            view.close();

            //Then
            assert.isTrue(window.EventOnClosedWasCall, 'OnClosed was not call');
        });

        it('should not call event onClosed when onClosing failed', function () {
            //Given
            var view = new View();
            window.EventOnClosedWasCall = false;

            view.onClosing(
                function () {
                    return false; // onClosing failed
                });

            view.onClosed(function () {
                window.EventOnClosedWasCall = true;
            });

            //When
            view.close();

            //Then
            assert.isFalse(window.EventOnClosedWasCall);
        });

        it('should select correct callback when onClosing passed', function () {
            //Given
            var view = new View();
            window.SuccessWasCall = false;
            window.ErrorWasCall = false;

            //When
            view.close(
                function () {
                    window.SuccessWasCall = true;
                },
                function () {
                    window.ErrorWasCall = true;
                }
            );

            //Then
            assert.isTrue(window.SuccessWasCall, 'success was not call');
            assert.isFalse(window.ErrorWasCall, 'error was call');
        });

        it('should select correct callback when onClosing failed', function () {
            //Given
            var view = new View();
            window.SuccessWasCall = false;
            window.ErrorWasCall = false;

            view.onClosing(
                function () {
                    return false; // onClosing failed
                });

            //When
            view.close(
                function () {
                    window.SuccessWasCall = true;
                },
                function () {
                    window.ErrorWasCall = true;
                }
            );

            //Then
            assert.isFalse(window.SuccessWasCall, 'success was call');
            assert.isTrue(window.ErrorWasCall, 'error was not call');
        });
    });

});