describe('TextBoxBuilder', function () {
    describe('build', function () {
        it('successful build TextBox', function () {
            // Given

            var metadata = {};

            // When
            var builder = new TextBoxBuilder();
            var element = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: metadata});

            // Then
            assert.isNotNull(element);
            assert.isObject(element);
        });
    });
});
