describe('Builder', function () {
    var builder;

    beforeEach(function () {
        builder = new Builder();
    });

    describe('build', function () {
        it('should return null if no builder found', function () {
            var view = builder.buildType('IncorrectType', null, {parentView: fakeView()});

            assert.isNull(view);
        });

        it('should find builder by metadataValue if no metadataType passed', function () {
            var viewFactory = function () {
                return 42;
            };

            builder.register('TextBox', { build: viewFactory});
            assert.equal(builder.build({ TextBox: {} }), 42);
        });

        it('should pick concrete value from metadata if no metadataType passed', function () {
            var viewBuilder = {
                build: function (context, args) {
                    assert.isNotNull(args.metadata.Name);
                    assert.isNotNull(args.metadata.Multiline);

                    assert.equal(args.metadata.Name, 'TextBox');
                    assert.isTrue(args.metadata.Multiline);
                }
            };

            builder.register('TextBox', viewBuilder);
            builder.build(null, { metadata: { TextBox: { Name: 'TextBox', Multiline: true } } });
        });
    });

    describe('register', function () {
        it('should have builder after register', function () {
            var viewFactory = function () {
                return 42;
            };
            builder.register('TextBox', { build: viewFactory});

            assert.equal(builder.buildType('TextBox', null, { parentView: fakeView() }), 42);
        });
    });
});