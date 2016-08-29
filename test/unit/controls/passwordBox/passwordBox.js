describe('PasswordBox', function () {

    var element;

    beforeEach(function () {
        element = new InfinniUI.PasswordBox();
    });

    describe('Render', function () {

        describe('Setting the properties', function () {

            it('Setting property: name', function () {
                //Given
                var $el = element.render();
                assert.isUndefined($el.attr('pl-data-pl-name'));

                //When
                element.setName('UserPassword');

                //Then
                assert.equal($el.attr('data-pl-name'), 'UserPassword');
            });

            it('Setting property: visible', function () {
                //Given
                var $el = element.render();
                assert.isFalse($el.hasClass('hidden'));

                //When
                element.setVisible(false);

                //Then
                assert.isTrue($el.hasClass('hidden'));
            });

            it('Setting property: labelText', function () {
                //Given
                var
                    label = "User's password",
                    $el = element.render(),
                    $label = $('label', $el);

                //When
                element.setLabelText(label);

                //Then
                assert.equal($label.html(), label);
            });

            it('Setting property: hintText', function () {
                //Given
                var
                    hint = "my hint",
                    $el = element.render(),
                    $hint = $('.pl-control-hint-text ', $el);

                //When
                element.setHintText(hint);

                //Then
                assert.equal($hint.html(), hint);
                assert.isFalse($hint.hasClass('hidden'));
            });

            it('Setting property: errorText', function () {
                //Given
                var
                    text = "error",
                    $el = element.render(),
                    $text = $('.pl-control-error-text ', $el);

                //When
                element.setErrorText(text);

                //Then
                assert.equal($text.html(), text);
                assert.isFalse($text.hasClass('hidden'));
            });

            it('Setting property: warningText', function () {
                //Given
                var
                    text = "warning",
                    $el = element.render(),
                    $text = $('.pl-control-warning-text ', $el);

                //When
                element.setWarningText(text);

                //Then
                assert.equal($text.html(), text);
                assert.isFalse($text.hasClass('hidden'));
            });

            it('Setting property: enabled', function () {
                //Given
                var
                    $el = element.render(),
                    $input = $('input', $el);

                //When
                element.setEnabled(false);

                //Then
                assert.isTrue($input.prop('disabled'));
                assert.isTrue($el.hasClass('pl-disabled'));
            });

        });

    });

});
