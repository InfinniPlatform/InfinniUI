describe('TabPanelElement', function () {
    var builder = new InfinniUI.ApplicationBuilder();

    describe('API', function () {

        it('Default values', function () {
            var element = builder.buildType('TabPanel', {});

            assert.equal(element.getHeaderLocation(), InfinniUI.TabHeaderLocation.top, 'HeaderLocation');
            assert.equal(element.getHeaderOrientation(), InfinniUI.TabHeaderOrientation.horizontal, 'HeaderOrientation');
        });


    });


});
