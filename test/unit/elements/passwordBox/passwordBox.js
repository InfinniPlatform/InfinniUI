describe('PasswordBox', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('PasswordBox', {});

        describe('Implementing PasswordBox Methods', function () {
            [
                'getLabelText',
                'setLabelText',
                'getLabelFloating',
                'setLabelFloating'
            ].forEach(function (methodName) {
                it(methodName, function () {
                    testHelper.checkMethod(element, methodName);
                });

            });
        });

        describe('Implementing EditorBase Methods', function () {
            testHelper.checkEditorBaseMethods(element);
        });

        describe('Implementing Element Methods', function () {
            testHelper.checkElementMethods(element);
        });
    });

    describe('Metadata', function () {

        it('Using default value', function () {
            var metadata = {
                "PasswordBox": {}
            };

            var element = builder.build(metadata, {});
            assert.equal(element.getLabelFloating(), false, 'LabelFloating');
        });

        it('Apply metadata', function () {
            var metadata = {
                "PasswordBox": {
                    "LabelText": "Label",
                    "LabelFloating": true
                }
            };

            var element = builder.build(metadata, {});

            assert.equal(element.getLabelText(), "Label", 'LabelText');
            assert.equal(element.getLabelFloating(), true, 'LabelFloating');
        });

        it('event OnValueChanged', function () {
            // Given
            var element = new PasswordBox(),
                onValueChangedFlag = 0;

            element.render();

            element.onValueChanged(function () {
                onValueChangedFlag++;
            });

            assert.equal(onValueChangedFlag, 0);

            // When
            element.setValue('P@$$w0rd');
            element.setValue('password');

            // Then
            assert.equal(onValueChangedFlag, 2);
        });

        it('event OnGotFocus/OnLostFocus', function () {
            // Given
            var element = new PasswordBox(),
                onFocusedFlag = 0;

            element.render();

            element.onGotFocus(function () {
                onFocusedFlag++;
            });

            element.onLostFocus(function () {
                onFocusedFlag--;
            });

            assert.equal(onFocusedFlag, 0);

            // When
            element.setFocused(true);
            // Then
            assert.isTrue(element.getFocused());
            assert.equal(onFocusedFlag, 1);
            element.setFocused(false);
            assert.isFalse(element.getFocused());
            assert.equal(onFocusedFlag, 0);
        });

    });
});
