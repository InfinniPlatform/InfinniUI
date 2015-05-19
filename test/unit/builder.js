describe('Builder', function () {
    var builder;

    beforeEach(function () {
        builder = new Builder();
    });

    describe('build', function () {
        it('should return null if no builder found', function () {
            var view = builder.buildType(fakeView(), 'TextBox', null);

            assert.isNull(view);
        });

        it('should find builder by metadataValue if no metadataType passed', function () {
            var viewFactory = function () {
                return 42;
            };

            builder.register('TextBox', { build: viewFactory});
            assert.equal(builder.build(null, { TextBox: {} }), 42);
        });

        it('should pick concrete value from metadata if no metadataType passed', function () {
            var viewBuilder = {
                build: function (b, p, metadata) {
                    assert.isNotNull(metadata.Name);
                    assert.isNotNull(metadata.Multiline);

                    assert.equal(metadata.Name, 'TextBox');
                    assert.isTrue(metadata.Multiline);
                }
            };

            builder.register('TextBox', viewBuilder);
            builder.build(null, { TextBox: { Name: 'TextBox', Multiline: true } });
        });
    });

    describe('register', function () {
        it('should have builder after register', function () {
            var viewFactory = function () {
                return 42;
            };
            builder.register('TextBox', { build: viewFactory});

            assert.equal(builder.buildType(fakeView(), 'TextBox', null), 42);
        });
    });
});