describe('FrameBuilder', function () {
    describe('build', function () {
        it('successful build Frame', function () {
            // Given

            var metadata = {};

            // When
            var builder = new FrameBuilder();
            var element = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: metadata});

            // Then
            assert.isNotNull(element);
            assert.isObject(element);
        });
    });
});
