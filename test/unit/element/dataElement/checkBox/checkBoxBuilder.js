describe('CheckBoxBuilder', function () {
    describe('build', function () {
        it('successful build CheckBox', function () {
            // Given
            var checkBoxMetadata = {
                Visible: false,
                HorizontalAlignment: 'Center',

                ReadOnly: true,
                Text: 'CheckBox'
            };

            var view = fakeView({
                getDataSource: function () {
                    return null;
                }
            });

            // When
            var builder = new CheckBoxBuilder();
            var checkBox = builder.build(new ApplicationBuilder(), view, checkBoxMetadata);

            // Then
            assert.isNotNull(checkBox);

            assert.isFalse(checkBox.getVisible(), 'Неверное значение для свойства Visible');
            assert.equal(checkBox.getHorizontalAlignment(), 'Center');

            assert.isTrue(checkBox.getReadOnly(), 'Неверное значение для свойства ReadOnly');
            assert.equal(checkBox.getText(), 'CheckBox');

            assert.isNotNull(checkBox.getValue());
        });
    });
});
