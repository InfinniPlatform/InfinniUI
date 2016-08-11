describe('ToolBarControl', function () {
    describe('render', function () {
        var builder = new ApplicationBuilder()
            , toolbar;

        beforeEach(function () {
            toolbar = builder.buildType('ToolBar', {
                Items: [
                    {
                        Button: {
                            Text: 'Button 1'
                        }
                    },
                    {
                        Label: {
                            Text: 'Button 2'
                        }
                    }
                ]
            });
        });

        it('should render button with correct class', function () {
            //Given


            //When
            var $el = toolbar.render();

            //Then
            assert.isTrue($el.hasClass('pl-tool-bar'));
        });
    });
});
