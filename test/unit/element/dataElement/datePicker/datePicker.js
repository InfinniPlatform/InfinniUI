describe('DatePicker', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('DatePicker', {});

        describe('Implementing DatePicker Methods', function () {
            ['getMinValue', 'setMinValue', 'getMaxValue', 'setMaxValue', 'getMode', 'setMode']
                .forEach(function (methodName) {
                    it(methodName, function() {
                        assert.isFunction(element[methodName], methodName);
                    });

                });
        });

        describe('Implementing TextEditorBase Methods', function () {
            ['getLabelText', 'setLabelText', 'getLabelFloating', 'setLabelFloating', 'getDisplayFormat',
                'setDisplayFormat', 'getEditMask', 'setEditMask']
                .forEach(function (methodName) {
                    it(methodName, function() {
                        assert.isFunction(element[methodName], methodName);
                    });
                });
        });

        describe('Implementing EditorBase Methods', function () {
            ['getValue', 'setValue', 'getHintText', 'setHintText', 'getErrorText','setErrorText', 'getWarningText',
                'setWarningText']
                .forEach(function (methodName) {
                    it(methodName, function() {
                        assert.isFunction(element[methodName], methodName);
                    });
                });
        });

        describe('Implementing Element Methods', function () {
            ['getView', '!getParent', '!setParent', 'getName', 'setName','getText', 'setText',
                '!getFocusable', '!setFocusable', '!getFocused', '!setFocused', 'getEnabled','setEnabled', 'getVisible',
                'setVisible', 'getHorizontalAlignment', 'setHorizontalAlignment', 'getVerticalAlignment',
                'setVerticalAlignment','!getTextHorizontalAlignment', '!setTextHorizontalAlignment',
                '!getTextVerticalAlignment','!setTextVerticalAlignment', '!getTextStyle', '!setTextStyle','!getForeground',
                '!setForeground', '!getBackground', '!setBackground', '!getTexture', '!setTexture', 'getChildElements',
                'getProperty', 'setProperty']
                .forEach(function (methodName) {
                    it(methodName, function() {
                        checkMethod(element, methodName);
                    });

                });
        });

        //@TODO Add Checking Events
    });

    describe('Metadata', function () {

        it('Using default value', function () {
            var metadata = {
                "DatePicker": {}
            };

            var element = builder.build(metadata, {});

            assert.equal(element.getMode(), 'Date', 'Mode');
            //assert.equal(element.getFocusable(), true, 'Focusable');
            assert.equal(element.getEnabled(), true, 'Enabled');
            assert.equal(element.getVisible(), true, 'Visible');
            assert.equal(element.getLabelFloating(), false, 'LabelFloating');
            assert.equal(element.getVerticalAlignment(), 'Top', 'VerticalAlignment');
            assert.equal(element.getHorizontalAlignment(), 'Stretch', 'HorizontalAlignment');
            //assert.equal(element.getTextHorizontalAlignment(), 'Left', 'TextHorizontalAlignment');
            //assert.equal(element.getTextVerticalAlignment(), 'Center', 'TextVerticalAlignment');
        });

        it('Apply metadata', function () {
            var metadata = {
                "DatePicker": {
                    "Name": "DatePicker1",
                    "MinValue": "2015-09-01T15:26:42.0060+05:00",
                    "MaxValue": "2015-09-18T15:26:42.0060+05:00",
                    "Mode": "DateTime",

                    "LabelText": "Datepicker's label",
                    "LabelFloating": true,
                    "DisplayFormat": {
                        "DateTimeFormat": {
                            "Format": "d"
                        }
                    },
                    "EditMask": {
                        "DateTimeEditMask": {
                            "Mask": "d"
                        }
                    },
                    "HintText": "Hint",
                    "ErrorText": "Error",
                    "WarningText": "Warning",
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

            assert.equal(element.getMinValue(), "2015-09-01T15:26:42.0060+05:00", 'MinValue');
            assert.equal(element.getMaxValue(), "2015-09-18T15:26:42.0060+05:00", 'MaxValue');
            assert.equal(element.getMode(), 'DateTime', 'DateTime');

            assert.equal(element.getLabelText(), "Datepicker's label", 'LabelText');
            assert.equal(element.getLabelFloating(), true, 'LabelFloating');
            assert.instanceOf(element.getDisplayFormat(), DateTimeFormat, 'DateTimeFormat');
            assert.instanceOf(element.getEditMask(), DateTimeEditMask, 'EditMask');

            assert.equal(element.getHintText(), "Hint", 'HintText');
            assert.equal(element.getErrorText(), "Error", 'ErrorText');
            assert.equal(element.getWarningText(), "Warning", 'WarningText');

            assert.equal(element.getName(), "DatePicker1", 'Name');
            assert.equal(element.getEnabled(), false, 'Enabled');
            assert.equal(element.getVisible(), false, 'Visible');
            assert.equal(element.getVerticalAlignment(), 'Bottom', 'VerticalAlignment');
            //assert.equal(element.getTextStyle(), 'Display4', 'TextStyle');
            //assert.equal(element.getForeground(), 'Primary1', 'Foreground');
            //assert.equal(element.getBackground(), 'Accent1', 'Background');

        });

        it('correct convert from string to date and from date to string', function () {
            // Given
            var datePicker = new DatePicker();

            datePicker.render();

            // When
            datePicker.setValue('2014-07-29');

            // Then
            assert.equal(datePicker.getValue().substr(0, 10), '2014-07-29');
        });

        it('event OnValueChanged', function () {
            // Given
            var datePicker = new DatePicker(),
                onValueChangedFlag = 0;

            datePicker.render();

            datePicker.onValueChanged(function () {
                console.log(arguments);
                onValueChangedFlag++;
            });

            assert.equal(onValueChangedFlag, 0);

            // When
            datePicker.setValue('2014-07-29');
            datePicker.setValue('2014-07-30');

            // Then
            assert.equal(onValueChangedFlag, 2);
        });

    });
});

