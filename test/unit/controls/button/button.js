describe('ButtonControl', function () {
    describe('render', function () {
        var builder = new InfinniUI.ApplicationBuilder()
            , button;

        beforeEach(function () {
            button = builder.buildType('Button', {});
        });

        it('should render button with correct class', function () {
            //Given
            button.setText('Click me!');

            //When
            var $el = button.render();

            //Then
            assert.isTrue($el.hasClass('pl-button'));
            assert.equal($.trim($el.text()), 'Click me!');
        });
    });
});
