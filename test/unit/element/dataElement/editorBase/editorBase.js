describe('EditorBase', function () {
    describe('Textbox as exemplar of EditorBase', function () {

        it('Base functional', function () {
            // Given
            var textBox = new TextBox();

            assert.isNull(textBox.getValue(), 'default value is null');
            assert.isNull(textBox.getHintText(), 'default hint text is null');
            assert.isNull(textBox.getErrorText(), 'default error text is null');
            assert.isNull(textBox.getWarningText(), 'default warning text is null');


            // When
            textBox.setValue('value');
            textBox.setHintText('hint text');
            textBox.setErrorText('error text');
            textBox.setWarningText('warning text');


            // Then
            assert.equal(textBox.getValue(), 'value', 'new value is right');
            assert.equal(textBox.getHintText(), 'hint text', 'new hint text is right');
            assert.equal(textBox.getErrorText(), 'error text', 'new error text is right');
            assert.equal(textBox.getWarningText(), 'warning text', 'new warning text is right');
        });

        it('Base events functional', function () {
            // Given
            var textBox = new TextBox(),
                handling = 0;

            textBox.onValueChanging(onValueChangingHandler);
            textBox.onValueChanged(onValueChangedHandler);

            // When
            textBox.setValue('new');

            // Then
            function onValueChangingHandler(context, args){
                assert.equal(handling, 0, 'right order: changing handler is first');
                assert.isNull(args.oldValue, 'old value is null');
                assert.equal(args.newValue, 'new', 'new value is "new"');
                assert.equal(args.source, textBox, 'right source');

                handling++;
            }

            function onValueChangedHandler(context, args){
                assert.equal(handling, 1, 'right order: changing handler is second');
                assert.isNull(args.oldValue, 'old value is null');
                assert.equal(args.newValue, 'new', 'new value is "new"');
                assert.equal(args.source, textBox, 'right source');
            }
        });

        it('cancelling changing event', function () {
            // Given
            var textBox = new TextBox(),
                handling = 0;

            textBox.onValueChanging(onValueChangingHandler1);
            textBox.onValueChanging(onValueChangingHandler2);

            // When
            textBox.setValue('new');

            // Then
            function onValueChangingHandler1(context, args){
                assert.equal(handling, 0, 'right order: changing handler is first');
                assert.equal(args.newValue, 'new', 'new value is "new"');

                handling++;

                return false
            }

            function onValueChangingHandler2(context, args){
                assert.equal(handling, 1, 'right order: this changing handler is second');
                assert.equal(args.newValue, 'new', 'new value is "new"');

                handling++;
            }

            assert.equal(handling, 2, 'right order');
            assert.isNull(textBox.getValue(), 'value should not be changed');
        });
    });

});