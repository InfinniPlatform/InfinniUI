describe('TextBoxControl', function () {
    var builder = new InfinniUI.ApplicationBuilder();

    describe('use edit mask', function () {
        it('as DateTimeEditMask', function () {
            // Given
            var element = builder.buildType('TextBox', {
                EditMask: {
                    DateTimeEditMask: {
                        Mask: "dd MM yyyy"
                    }
                }
            });

            // When
            var $el = element.render();
            element.setValue('2017-04-26T16:46:00+05:00');
            element.control.controlView.setEditMode(true);

            //Then
            assert.equal($('input', $el).val(), '26 04 2017');
        });

        it('as TemplateEditMask', function () {
            // Given
            var element = builder.buildType('TextBox', {
                EditMask: {
                    TemplateEditMask: {
                        Mask: "(000)000-00-00",
                        MaskSaveLiteral: false
                    }
                }
            });

            // When
            var $el = element.render();
            element.control.controlView.setEditMode(true);

            //Then
            assert.equal($('input', $el).val(), '(___)___-__-__');
        });
    });

    describe('render', function () {
        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var element = builder.buildType('TextBox', {});
            var
                $el = element.render(),
                $control = $el.find('input');

            assert.equal($control.val(), '');
            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($control.prop('disabled'));
            assert.isFalse($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pl-horizontal-Left'));

            // When
            element.setValue('new');
            element.setName('newName');
            element.setEnabled(false);
            element.setVisible(false);
            element.setHorizontalAlignment('Left');

            // Then
            assert.equal($control.val(), 'new');
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($control.prop('disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isTrue($el.hasClass('pl-horizontal-Left'));
        });


        describe('Multiline TextBox', function () {
            it('textarea html input', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: true,
                    Enabled: false
                });

                // When
                var $el = element.render(),
                    $input = $el.find('.pl-text-area-input');

                // Then
                assert.equal($input.length, 1, 'textarea control');
                assert.equal($input.prop('disabled'), true);
            });

            it('Setting LineCount', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: true,
                    LineCount: 4
                });

                // When
                var $el = element.render(),
                    $input = $el.find('.pl-text-area-input');

                // Then
                assert.equal($input.prop('rows'), 4, 'row count');
            });

            it('Setting LabelText', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: true,
                    LabelText: "MyLabel"
                });

                // When
                var $el = element.render(),
                    $label = $el.find('.pl-control-label');

                // Then
                assert.equal($label.length, 1, 'render Label');
                assert.equal($label.text(), 'MyLabel', 'setting label');
            });

            it('Setting DisplayFormat', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: true,
                    LineCount: 4,

                    DisplayFormat: "${title}"
                });

                // When
                element.setValue({title: "Value"});
                var $el = element.render(),
                    $input = $el.find('.pl-text-area-input');

                // Then
                assert.equal($input.val(), 'Value');
            });

            it('Setting HintText, ErrorText, WarningText', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: true,
                    LineCount: 4,
                    HintText: 'Default hint',
                    ErrorText: 'Default error',
                    WarningText: 'Default warning'
                });

                var $el = element.render(),
                    $hint = $el.find('.pl-control-hint-text'),
                    $error = $el.find('.pl-control-error-text'),
                    $warning = $el.find('.pl-control-warning-text');

                assert.equal($hint.text(), 'Default hint');
                assert.equal($error.text(), 'Default error');
                assert.equal($warning.text(), 'Default warning');

                // When
                element.setHintText('Hint');
                element.setErrorText('Error');
                element.setWarningText('Warning');

                // Then
                assert.equal($hint.text(), 'Hint');
                assert.equal($error.text(), 'Error');
                assert.equal($warning.text(), 'Warning');
            });

        });

        describe('Not multiline TextBox', function () {
            it('html input', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: false,
                    Enabled: false
                });

                // When
                var $el = element.render(),
                    $input = $el.find('input.pl-text-box-input');

                // Then
                assert.equal($input.length, 1, 'input control');
                assert.equal($input.prop('disabled'), true);
            });

            it('Setting LabelText', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: false,
                    LabelText: "MyLabel"
                });

                // When
                var $el = element.render(),
                    $label = $el.find('.pl-control-label');

                // Then
                assert.equal($label.length, 1, 'render Label');
                assert.equal($label.text(), 'MyLabel', 'setting label');
            });

            it('Setting DisplayFormat', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    Multiline: false,
                    DisplayFormat: "${title}"
                });

                // When
                element.setValue({title: "Value"});
                var $el = element.render(),
                    $input = $el.find('input.pl-text-box-input');

                // Then
                assert.equal($input.val(), 'Value');
            });

            it('Setting HintText, ErrorText, WarningText', function () {
                // Given
                var element = builder.buildType('TextBox', {
                    HintText: 'Default hint',
                    ErrorText: 'Default error',
                    WarningText: 'Default warning'
                });

                var $el = element.render(),
                    $hint = $el.find('.pl-control-hint-text'),
                    $error = $el.find('.pl-control-error-text'),
                    $warning = $el.find('.pl-control-warning-text');

                assert.equal($hint.text(), 'Default hint');
                assert.equal($error.text(), 'Default error');
                assert.equal($warning.text(), 'Default warning');

                // When
                element.setHintText('Hint');
                element.setErrorText('Error');
                element.setWarningText('Warning');

                // Then
                assert.equal($hint.text(), 'Hint');
                assert.equal($error.text(), 'Error');
                assert.equal($warning.text(), 'Warning');
            });
        });

        it('Setting element\'s property', function () {
            // Given
            var element = builder.buildType('TextBox', {
                Name: 'TextBox1',
                Enabled: false,
                Visible: false,
                HorizontalAlignment: 'Stretch'
            });

            // When
            var $el = element.render();

            //Then
            assert.equal($el.attr('data-pl-name'), 'TextBox1', 'Name');
            assert.isTrue($el.hasClass('pl-disabled'), 'Enabled');
            assert.isTrue($el.hasClass('hidden'), 'Visible');
            assert.isTrue($el.hasClass('pl-horizontal-Stretch'), 'HorizontalAlignment');
        });

    })
});
