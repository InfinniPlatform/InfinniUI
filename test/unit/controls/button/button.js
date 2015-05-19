describe('ButtonControl', function () {
    describe('render', function () {
        it('should render button with correct class', function () {
            //Given
            var button = new ButtonControl();
            button.set('text','Click me!');

            //When
            var $el = button.render().children();

            //Then
            assert.equal($el.attr('type'), 'button');
            assert.isTrue($el.hasClass('btn'));
            assert.isTrue($el.hasClass('btn-primary'));
            assert.equal($el.text(), 'Click me!');
        });
    });
});