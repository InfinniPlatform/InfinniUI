describe('FrameBuilder', function () {
    describe('build', function () {
        it('successful build Frame', function () {
            // Given

            var metadata = {};

            // When
            var builder = new InfinniUI.FrameBuilder();
            var element = builder.build(null, {builder: new InfinniUI.ApplicationBuilder(), view: new InfinniUI.View(), metadata: metadata});

            // Then
            assert.isNotNull(element);
            assert.isObject(element);
        });
    });
});
