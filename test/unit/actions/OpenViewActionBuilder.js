describe('QpenViewActionBuilder', function () {
    describe('build', function () {
        it('successful build', function () {
            var metadata = {

                OpenViewAction: {
                    View: {
                        ExistsView: {

                        }
                    }
                }
            };
            var builder = new ApplicationBuilder();
            var a = builder.build(null, metadata);

            assert.isNotNull(a);
            assert.isNotNull( a.execute);
        });
    });

});