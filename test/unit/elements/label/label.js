describe('Label', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('Label', {});

        describe('Implementing Label Methods', function () {
            ['getDisplayFormat', 'setDisplayFormat', 'getTextTrimming', 'setTextTrimming',
                'getTextWrapping', 'setTextWrapping']
                .forEach(function (methodName) {
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
                "Label": {}
            };

            var element = builder.build(metadata, {});

            //assert.equal(element.getTextTrimming(), true, 'TextTrimming');
            assert.equal(element.getTextWrapping(), true, 'TextWrapping');

            assert.equal(element.getVisible(), true, 'Visible');
            assert.equal(element.getVerticalAlignment(), 'Top', 'VerticalAlignment');
            assert.equal(element.getHorizontalAlignment(), 'Stretch', 'HorizontalAlignment');
            var displayFormat = element.getDisplayFormat();
            var value = {};
            assert.isTrue(displayFormat(null, {value: value}) === value, 'DisplayFormat');
        });

        it('Apply metadata', function () {
            var metadata = {
                "Label": {
                    "TextWrapping": false,

                    "Text": "Label",
                    "LabelFloating": true,
                    "DisplayFormat": "d",
                    "HintText": "Hint",
                    "ErrorText": "Error",
                    "WarningText": "Warning",

                    "Name": "Label1",
                    "Enabled": false,
                    "Visible": false,
                    "VerticalAlignment": "Bottom",
                    "HorizontalAlignment": "Right",
                    "TextStyle": "Display4",
                    "Foreground": "Primary1",
                    "Background": "Accent1"
                }
            };

            var element = builder.build(metadata, {});

            assert.equal(element.getTextWrapping(), false, 'TextWrapping');
            assert.isFunction(element.getDisplayFormat(), 'DisplayFormat');

            assert.equal(element.getHintText(), "Hint", 'HintText');
            assert.equal(element.getErrorText(), "Error", 'ErrorText');
            assert.equal(element.getWarningText(), "Warning", 'WarningText');

            assert.equal(element.getName(), "Label1", 'Name');
            assert.equal(element.getText(), "Label", 'LabelText');
            assert.equal(element.getEnabled(), false, 'Enabled');
            assert.equal(element.getVisible(), false, 'Visible');
            assert.equal(element.getVerticalAlignment(), 'Bottom', 'VerticalAlignment');
            assert.equal(element.getTextStyle(), 'Display4', 'TextStyle');
            assert.equal(element.getForeground(), 'Primary1', 'Foreground');
            assert.equal(element.getBackground(), 'Accent1', 'Background');

        });

        it('event OnValueChanged', function () {
            // Given
            var label = new Label(),
                onValueChangedFlag = 0;

            label.render();

            label.onValueChanged(function () {
                onValueChangedFlag++;
            });

            assert.equal(onValueChangedFlag, 0);

            // When
            label.setValue('2014-07-29');
            label.setValue('2014-07-30');

            // Then
            assert.equal(onValueChangedFlag, 2);
        });

    });
});
