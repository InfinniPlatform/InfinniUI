describe('DataNavigationControl', function () {
    describe('render', function () {
        var builder = new InfinniUI.ApplicationBuilder()
            , button;

        beforeEach(function () {
            button = builder.buildType('DataNavigation', {});
        });

        it('should render dataNavigation with correct class', function () {
            //Given

            //When
            var $el = button.render();

            //Then
            assert.isTrue($el.hasClass('pl-data-navigation'));
        });
    });
});
