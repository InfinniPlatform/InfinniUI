describe('ButtonControl', function () {
    describe('render', function () {
        it('should render button with correct class', function () {
            //Given
            var button = new ButtonControl();
            button.set('text','Click me!');

            //When
            var $el = button.render().children();

            //Then
            assert.isTrue($el.hasClass('btn'));
            assert.equal($.trim($el.text()), 'Click me!');
        });
    });
});