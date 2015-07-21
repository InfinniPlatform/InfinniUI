describe('StackPanel', function () {
    describe('Render', function () {
        // Given
        var textBox1 = new TextBox();
        textBox1.setValue('test1');

        var textBox2 = new TextBox();
        textBox2.setValue('test2');

        var stackPanel = new StackPanel();
        var $el;

        it('StackPanel with 2 TextBoxes', function () {
            // When
            stackPanel.addItem(textBox1);
            stackPanel.addItem(textBox2);
            $el = stackPanel.render();

            // Then
            var textboxes = $el.find('input.pl-text-box-input');
            assert.equal(textboxes.length, 2);
            assert.equal($(textboxes[0]).val(), 'test1');
            assert.equal($(textboxes[1]).val(), 'test2');
        });

        it('StackPanel orientation', function () {
            assert.isFalse($el.hasClass('horizontal-orientation'));

            // When
            stackPanel.setOrientation('Horizontal');

            // Then
            assert.isTrue($el.hasClass('horizontal-orientation'));
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var applicationBuilder = new Builder();
            var stackPanel = new StackPanelBuilder();
            var view = new View();
            var metadata = {
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {stackPanelLoaded:false};
            view.setScripts([{Name:"OnLoaded", Body:"window.Test.stackPanelLoaded = true"}]);

            //When
            var build = stackPanel.build(null, {builder: applicationBuilder, parent: view, metadata: metadata});
            $(build.render());

            // Then
            assert.isTrue(window.Test.stackPanelLoaded);
        });
    });
});