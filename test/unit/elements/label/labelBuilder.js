describe('LabelBuilder', function () {
    describe('build', function () {
        it('successful build Label', function () {
            // Given

            var metadata = {};

            // When
            var builder = new LabelBuilder();
            var element = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: metadata});

            // Then
            assert.isNotNull(element);
            assert.isObject(element);
        });
    });
});
