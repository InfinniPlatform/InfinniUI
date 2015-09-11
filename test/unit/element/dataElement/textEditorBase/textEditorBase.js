describe('TextEditorBase', function () {
    describe('Textbox as exemplar of TextEditorBase', function () {

        it('Base functional', function () {
            // Given
            var textBox = new TextBox();
            var format = new ObjectFormat();
            var mask = new DateTimeEditMask();

            assert.isNull(textBox.getLabelText(), 'default label text is null');
            assert.isFalse(textBox.getLabelFloating(), 'default label floating is false');
            assert.isNull(textBox.getDisplayFormat(), 'default display format is null');
            assert.isNull(textBox.getEditMask(), 'default edit mask is null');


            // When
            textBox.setLabelText('label');
            textBox.setLabelFloating(true);
            textBox.setDisplayFormat(format);
            textBox.setEditMask(mask);


            // Then
            assert.equal(textBox.getLabelText(), 'label', 'new label text is right');
            assert.isTrue(textBox.getLabelFloating(), 'new label floating is true');
            assert.equal(textBox.getDisplayFormat(), format, 'new display format is right');
            assert.equal(textBox.getEditMask(), mask, 'new edit mask is right');
        });

    });

});