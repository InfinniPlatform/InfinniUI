describe('PopupButtonControl', function () {
    describe('render', function () {
        var builder = new ApplicationBuilder()
            , button;

        beforeEach(function () {
            button = builder.buildType('PopupButton', {
                Items: [
                    {
                        "Button": {
                            "Name": "AddButton",
                            "Text": "Add"
                        }
                    },
                    {
                        "Button": {
                            "Name": "DropButton",
                            "Text": "Drop"
                        }
                    },
                    {
                        "Button": {
                            "Name": "BackButton",
                            "Text": "Back"
                        }
                    }
                ]
            });
        });


        it('should render button with correct class', function () {
            //Given
            button.setText('Click me!');
            //When
            var $el = button.render();
            //Then
            var $button = $el.find('.pl-popup-button__button');
            assert.isTrue($el.hasClass('pl-popup-button'), 'control class');
            assert.equal($button.length, 1, 'button render');
            assert.equal($button.text(), 'Click me!', 'button text');
        });

        it('should handle onClick', function () {
            //Given
            var click = 0;
            button.setText('Click me!');
            button.onClick(function () {
                click++;
            });
            //When
            var $el = button.render();
            button.click();
            //Then
            assert.isTrue(click === 1);
        });

    });
});