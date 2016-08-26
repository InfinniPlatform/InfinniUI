describe('Parameters', function () {

    it('Parameter base API', function () {

        // Given When
        var view = fakeView();
        var parameter = new InfinniUI.Parameter({view: view, name: 'name'});

        // Then
        assert.equal(parameter.getView(), view, 'view is right');
        assert.equal(parameter.getName(), 'name', 'name is right');
    });

    it('Parameter value and property', function () {

        // Given
        var parameter = new InfinniUI.Parameter({view: fakeView(), name: 'name'}),
            val = {
                f1:{
                    value: 5
                },
                f2: 3
            };

        assert.isUndefined(parameter.getValue(), 'start value is undefined');
        assert.isUndefined(parameter.getProperty(''), 'start property is undefined');
        assert.isUndefined(parameter.getProperty('f1'), 'start property is undefined 2');
        assert.isUndefined(parameter.getProperty('f1.value'), 'start property is undefined 3');

        //When
        parameter.setValue(val);

        // Then
        assert.equal(parameter.getValue(), val, 'value after setting is right');
        assert.equal(parameter.getProperty(''), val, 'property after setting is right');
        assert.equal(parameter.getProperty('f1'), val.f1, 'property after setting is right 2');
        assert.equal(parameter.getProperty('f1.value'), val.f1.value, 'property after setting is right 3');
    });

    it('Parameter handling property changed', function () {

        // Given
        var parameter = new InfinniUI.Parameter({view: fakeView(), name: 'name'}),
            handlerWasCalled = false,
            val = {
                f1:{
                    value: 5
                },
                f2: 3
            };

        parameter.setValue(10);

        parameter.onPropertyChanged(onPropertyChangedHandler);

        //When
        parameter.setValue(val);

        // Then
        function onPropertyChangedHandler(context, args){
            assert.equal(args.newValue, val, 'new value is right');
            assert.equal(args.oldValue, 10, 'old value is right');

            handlerWasCalled = true;
        }

        assert.isTrue(handlerWasCalled, 'handler was called');
    });

});
