describe('TabPanelElement', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {

        it('Default values', function () {
            var element = builder.buildType('TabPanel', {});

            assert.equal(element.getHeaderLocation(), TabHeaderLocation.top, 'HeaderLocation');
            assert.equal(element.getHeaderOrientation(), TabHeaderOrientation.horizontal, 'HeaderOrientation');
        });


    });


});