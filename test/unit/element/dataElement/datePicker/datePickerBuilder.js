describe('DatePickerBuilder', function () {
    describe('build', function () {
        it('successful build DatePicker', function () {
            // Given

            var datePickerMetadata = {};

            // When
            var builder = new DatePickerBuilder();
            var datePicker = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: datePickerMetadata});

            // Then
            assert.isNotNull(datePicker);
            assert.isObject(datePicker);

        });
    });
});
