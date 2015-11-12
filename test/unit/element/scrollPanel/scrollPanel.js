describe('ScrollPanelElement', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {

        it('implements API methods', function () {
            var element = builder.buildType('ScrollPanel', {});

            assert.isFunction(element.getHorizontalScroll, 'getHorizontalScroll');
            assert.isFunction(element.setHorizontalScroll, 'setHorizontalScroll');
            assert.isFunction(element.getVerticalScroll, 'getVerticalScroll');
            assert.isFunction(element.setVerticalScroll, 'setVerticalScroll');
        });


        it('Default values', function () {
            var element = builder.buildType('ScrollPanel', {});

            assert.equal(element.getHorizontalScroll(), ScrollVisibility.auto, 'getHorizontalScroll');
            assert.equal(element.getVerticalScroll(), ScrollVisibility.auto, 'getVerticalScroll');
        });


    });


});