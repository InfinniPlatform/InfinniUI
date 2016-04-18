describe('DateTimePickerBuilder', function () {
    describe('build', function () {
        it('successful build DateTimePicker', function () {
            // Given

            var dateTimePickerMetadata = {};

            // When
            var builder = new DateTimePickerBuilder();
            var dateTimePicker = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: dateTimePickerMetadata});

            // Then
            assert.isNotNull(dateTimePicker);
            assert.isObject(dateTimePicker);

        });
    });
});
